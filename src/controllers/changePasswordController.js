const Database = require('../database.js'),
    database = new Database(),
    passwordHash = require('password-hash'),
    jwt = require('jsonwebtoken');



exports.change_password = function(req, res) {
    let decodedToken=jwt.decode(req.token);
    let userQuery = `SELECT user_password FROM users WHERE user_id=${decodedToken.id}`;

    database.query(userQuery, function (err, user) {
        if (err || !user || !user.length) {
            return res.sendStatus(404);
        } else {
            if (passwordHash.verify(req.body.oldPassword, user[0].user_password)){
                let changeQuery=`UPDATE users SET password_mustchange=0, user_password='${passwordHash.generate(req.body.newPassword)}' WHERE user_id=${decodedToken.id}`;
                database.query(changeQuery, function (err) {
                    if (err) {
                        return res.sendStatus(500);
                    } else {
                        return res.json({'status': 'password changed successfully'})
                    }
                });
            } else {
                return res.sendStatus(401);
            }
        }
    });
};
