const Database = require('../database.js'),
    database = new Database(),
    appConfig = require('../appConfig'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../verifyToken.js'),
    fs = require("fs"),
    multer = require('multer'),
    storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './article-images/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    upload = multer({ //multer settings
        storage: storage
    }).single('file'),
    path = require('path');


exports.get_article = function(req, res) {
    let articleQuery = `select articles.*, user_first_name, user_last_name from articles JOIN users ON article_author = user_id WHERE article_tab = '${req.params.tab}'`;

    database.query(articleQuery)
        .then((rows) => {
            if(rows.length) {
                return res.json(rows);
            }
        }, () => {
            return res.sendStatus(404);
        });
};

exports.get_articles = function(req, res) {
    let articlesQuery = "select articles.*, user_first_name, user_last_name from articles JOIN users ON article_author = user_id";

    database.query(articlesQuery)
        .then((rows) => {
            return res.json(rows);
        }, () => {
            return res.sendStatus(404);
        });
};

exports.upload_image = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            upload(req,res,function(err){
                if(err){
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end('{error_code:1,err_desc:'+err+'}');
                    return;
                }
                res.json({error_code:0,err_desc:null});
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.display_image = function(req, res) {
    let fileType;
    if(path.extname(req.params.filename)==='.jpg') {
        fileType='jpeg';
    } else {
        fileType=path.extname(req.params.filename).replace('.', '');
    }
    fs.readFile('./article-images/'+req.params.filename, (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.writeHead(200, {'Content-Type': 'image/'+fileType});
            res.end(data);
        }

    });
};

exports.update_article = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let filename;
            if(req.body.article_image_filename===null){
                filename = req.body.article_image_filename;
            } else {
                filename = `'${req.body.article_image_filename}'`;
            }
            let articleUpdateQuery = `UPDATE articles SET article_title = '${req.body.article_title}', article_subtitle = '${req.body.article_subtitle}', article_date = NOW(), article_content = '${req.body.article_content}', article_image_filename = ${filename}, article_image_class = '${req.body.article_image_class}' WHERE article_tab = '${req.body.article_tab}'`;
            database.query(articleUpdateQuery, function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Article updated successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};