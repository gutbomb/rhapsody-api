const database = require('../database.js'),
    appConfig = require('../appConfig.js'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../verifyToken.js');


exports.update_account = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
    let decodedToken = jwt.decode(req.token);
    let updateUserQuery = `UPDATE users SET user_first_name=?, user_last_name=?, user_email=? WHERE user_id=?`;
        database.execute(updateUserQuery, [req.body.user_first_name, req.body.user_last_name, req.body.user_email, decodedToken.id], function (err) {
            if (err) {
                return res.status(500).json({'status': 'Database error', 'errors': err});
            } else {
                return res.json({'status': 'User updated successfully'});
            }
        });
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};
