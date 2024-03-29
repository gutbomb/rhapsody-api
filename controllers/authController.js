const database = require('../database.js'),
    appConfig = require('../appConfig.js'),
    passwordHash = require('password-hash'),
    jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    let loginQuery = 'SELECT user_id, user_password, user_level FROM users WHERE user_email=?';
    database.execute(loginQuery, [req.body.username], function (err, auth) {
        if (err || !auth || !auth.length) {
            return res.status(401).json({'status': 'Username or password not found.'});
        } else {
            if (passwordHash.verify(req.body.password, auth[0].user_password)){
                let loginDateQuery = 'UPDATE users SET last_login_time=NOW() WHERE user_id=?';
                database.execute(loginDateQuery, [auth[0].user_id], function (err) {
                    if (err) {
                        return res.status(500).json({'status': 'Database error'});
                    } else {
                        let token = jwt.sign({id: auth[0].user_id, userLevel: auth[0].user_level}, appConfig.jwtKey);
                        return res.json({'token' : token});
                    }
                });
            } else {
                return res.status(401).json({'status': 'Username or password not found.'});
            }
        }
    });
};
