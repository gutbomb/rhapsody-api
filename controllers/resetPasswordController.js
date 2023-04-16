const database = require('../database.js'),
    appConfig = require('../appConfig.js'),
    passwordHash = require('password-hash'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(appConfig.mailConfig);

exports.reset_password = function(req, res) {
    let userQuery = 'SELECT user_id, user_first_name, user_last_name FROM users WHERE user_email=?';

    database.execute(userQuery, [req.params.userEmail], function (err, user) {
        if (err || !user || !user.length) {
            return res.sendStatus(404);
        } else {
            let newPassword=Math.random().toString(36).substr(2, 8);
            let changeQuery='UPDATE users SET password_mustchange=1, user_password=? WHERE user_id=?';
            database.execute(changeQuery, [passwordHash.generate(newPassword), user[0].user_id], function (err) {
                if (err) {
                    return res.sendStatus(500);
                } else {
                    let mailOptions = {
                        from: appConfig.mailConfig.auth.user,
                        to: req.params.userEmail,
                        subject: 'Rhapsody Fiber Arts Password Reset',
                        text: 'Hello '+user[0].user_first_name+' '+user[0].user_last_name+',\n\rYour password has been reset to \''+newPassword+'\'.  Please visit ' + appConfig.appUrl + '/admin/login to log in.'
                    };
                    transporter.sendMail(mailOptions, (e) => {console.error(e)}, (r) => {console.log(r)});
                    return res.json({'status': 'password changed successfully'})
                }
            });

        }
    });
};
