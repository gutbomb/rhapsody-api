const database = require('../database.js'),
    appConfig = require('../appConfig.js'),
    passwordHash = require('password-hash'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../verifyToken.js'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(appConfig.mailConfig);

exports.get_users = function(req, res) {
    let usersQuery = 'SELECT user_id, user_email, user_first_name, user_last_name, password_mustchange, user_level, last_login_time, user_created_time, user_email_validated FROM users';

    database.execute(usersQuery, [], function(err, rows, fields) {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        } else {
            if(rows.length) {
                return res.json(rows);
            } else {
                return res.sendStatus(404);
            }
        } 
    });
};

exports.get_user = function(req, res) {
    let usersQuery = 'SELECT user_id, user_email, user_first_name, user_last_name, password_mustchange, user_level, last_login_time, user_created_time, user_email_validated FROM users WHERE user_id=?';

    database.execute(usersQuery, [req.params.userId], function(err, rows, fields) {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        } else {
            if(rows.length) {
                return res.json(rows[0]);
            } else {
                return res.sendStatus(404);
            }
        } 
    });
};

exports.sign_up = function(req, res) {
    let userQuery = 'SELECT user_email FROM users WHERE user_email=?';
    database.execute(userQuery, [req.body.email], function (err, user) {
        if (err) {
            return res.status(500).json({'status': 'Database error'});
        } else {
            if (!user || !user.length) {
                let validationString=Math.random().toString(36).substr(2, 16);
                let addUserQuery = "INSERT INTO users (user_first_name, user_last_name, user_email, user_level, password_mustchange, user_password, user_email_validated, user_validation_string) VALUES (?, ?, ?, 'user', 0, ?, 0, ?)";
                database.execute(addUserQuery, [req.body.user_first_name, req.body.user_last_name, req.body.email, passwordHash.generate(req.body.user_password), validationString], function (err) {
                    if (err) {
                        return res.status(500).json({'status': 'Database error', 'errors': err, 'sql': addUserQuery});
                    } else {
                        let mailOptions = {
                            from: appConfig.mailConfig.auth.user,
                            to: req.body.email,
                            subject: 'Skeleton - New Account',
                            text: 'Hello '+req.body.user_first_name+' '+req.body.user_last_name+',\n\rAn account has been created for you on the Skeleton system.  Please visit '+appConfig.appUrl+'/validate/'+validationString+' to activate your account.'
                        };
                        transporter.sendMail(mailOptions, function(){});
                        return res.json({'status': 'User added successfully'});
                    }
                });
            } else {
                return res.status(409).json({'status': 'User already exists'});
            }
        }
    });
};

exports.add_user = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let userQuery = 'SELECT user_email FROM users WHERE user_email=?';
            database.execute(userQuery, [req.body.email], function (err, user) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    if (!user || !user.length) {
                        let newPassword=Math.random().toString(36).substr(2, 8);
                        let addUserQuery = "INSERT INTO users (user_first_name, user_last_name, user_email, user_level, password_mustchange, user_password, user_email_validated, user_validation_string) VALUES (?, ?, ?, ?, 1, ?, 1, '')";
                        database.execute(addUserQuery, [req.body.user_first_name, req.body.user_last_name, req.body.email, req.body.user_level, passwordHash.generate(newPassword)], function (err) {
                            if (err) {
                                return res.status(500).json({'status': 'Database error'});
                            } else {
                                let mailOptions = {
                                    from: appConfig.mailConfig.auth.user,
                                    to: req.body.email,
                                    subject: 'Rhapsody Fiber Arts - New Account',
                                    text: 'Hello '+req.body.user_first_name+' '+req.body.user_last_name+',\n\rAn account has been created for you on Rhapsody Fiber Arts.  Your username is \''+req.body.email+'\' and your password is \''+newPassword+'\'.  Please visit '+appConfig.appUrl+'/admin/login to log in.'
                                };
                                transporter.sendMail(mailOptions, function(){});
                                return res.json({'status': 'User added successfully'});
                            }
                        });
                    } else {
                        console.log('existing user already found');
                        return res.status(409).json({'status': 'User already exists'});
                    }
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.update_user = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.id === req.params.userId || decodedToken.userLevel === 'admin') {

            let updateUserQuery = 'UPDATE users SET user_first_name=?, user_last_name=?, user_email=?, user_level=? WHERE user_id=?';
            database.execute(updateUserQuery, [req.body.user_first_name, req.body.user_last_name, req.body.user_email, req.body.user_level, req.params.userId], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'User updated successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.delete_user = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let deleteUserQuery='DELETE FROM users WHERE user_id=?';
            database.execute(deleteUserQuery, [req.params.userId], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'User deleted successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.validate_user = function (req, res) {
    let userQuery = 'SELECT user_email_validated FROM users WHERE user_validation_string=?';
    database.execute(userQuery, [req.params.userValidationString], function (err, user) {
        if (err) {
            return res.status(500).json({'status': 'Database error', 'errors': err});
        } else {
            if (!user || !user.length) {
                return res.status(404).json({'status': 'User not found'});
            } else {
                if (user[0].user_email_validated === 0) {
                    let validateUserQuery = 'UPDATE users SET user_email_validated = 1 WHERE user_validation_string=?';
                    database.execute(validateUserQuery, [req.params.userValidationString], function (err) {
                        if (err) {
                            return res.status(500).json({'status': 'Database error'});
                        } else {
                            return res.json({'status': 'User validated successfully'});
                        }
                    });
                } else {
                    return res.status(409).json({'status': 'User already validated'});
                }
            }
        }
    });
};

exports.resend_validation = function (req, res) {
    let userQuery = 'SELECT user_email_validated, user_first_name, user_last_name, user_validation_string FROM users WHERE user_email=?';
    database.execute(userQuery, [req.params.userEmail], function (err, user) {
        if (err) {
            return res.status(500).json({'status': 'Database error', 'errors': err});
        } else {
            if (!user || !user.length) {
                return res.status(404).json({'status': 'User not found'});
            } else {
                let mailOptions = {
                    from: appConfig.mailConfig.auth.user,
                    to: req.params.userEmail,
                    subject: 'Rhapsody Fiber Arts - New Account',
                    text: 'Hello '+user[0].user_first_name+' '+user[0].user_last_name+',\n\rAn account has been created for you on the Rhapsody Fiber Arts system.  Please visit '+appConfig.appUrl+'/validate/'+user[0].user_validation_string+' to activate your account.'
                };
                transporter.sendMail(mailOptions, function(){});
                return res.json({'status': 'Validation re-sent successfully'});
            }
        }
    });
};
