const database = require('../database.js'),
    appConfig = require('../appConfig'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../verifyToken.js'),
    fs = require("fs"),
    multer = require('multer'),
    storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, appConfig.serverPath + '/colorway-images/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    upload = multer({ //multer settings
        storage: storage
    }).single('file'),
    path = require('path');


exports.get_colorways = function(req, res) {
    let colorwaysObject, colorwayRows, imageRows,
        colorwayCategoriesQuery = 'select * from colorway_categories',
        colorwaysQuery = 'select * from colorways',
        colorwayImagesQuery = 'select * from colorway_images';

    database.execute(colorwayCategoriesQuery, [], function(err, categoryRows, fields) {
        if(categoryRows.length) {
            colorwaysObject = categoryRows;
            database.execute(colorwaysQuery, [], function(err, colorwaysRows, fields) {
                if(colorwaysRows.length) {
                    colorwayRows = colorwaysRows;
                    database.execute(colorwayImagesQuery, [], function(err, colorwayImageRows, fields) {
                        if(colorwayImageRows.length) {
                            imageRows = colorwayImageRows;
                            colorwaysObject.forEach((e, i, a) => {
                                a[i].colorways=[];
                            });
                            colorwayRows.forEach((e, i, a) => {
                                a[i].images=[];
                            });
                            colorwayRows.forEach((colorway, colorwayIndex, colorwayArray) => {
                                imageRows.forEach((image) =>{
                                    if(colorway.colorway_id === image.colorway_id) {
                                        colorwayArray[colorwayIndex].images.push(image);
                                    }
                                });
                            });
                            colorwaysObject.forEach((category, categoryIndex, categoryArray) => {
                                colorwayRows.forEach((colorway) =>{
                                    if(category.colorway_category_id === colorway.colorway_category_id) {
                                        categoryArray[categoryIndex].colorways.push(colorway);
                                    }
                                });
                            });
                            return res.json(colorwaysObject);
                        }
                    })
                }
            })
        } else {
            return res.sendStatus(404);
        }
    })
};

exports.add_colorway = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let addColorwayQuery = 'INSERT INTO colorways (colorway_name, colorway_category_id) VALUES (?, ?)';
            database.execute(addColorwayQuery, [req.body.colorway_name, req.body.colorway_category_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway added successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.update_colorway = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let updateColorwayQuery = 'UPDATE colorways SET colorway_name = ?, colorway_category_id = ? WHERE colorway_id = ?';
            database.execute(updateColorwayQuery, [req.body.colorway_name, req.body.colorway_category_id, req.body.colorway_id], function (err) {
                if (err) {
                    console.error(err); 
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway updated successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.delete_colorway = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let deleteColorwayQuery = 'DELETE FROM colorways WHERE colorway_id = ?; DELETE FROM colorway_images WHERE colorway_id = ?;';
            database.query(deleteColorwayQuery, [req.params.colorway_id, req.params.colorway_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway deleted successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.add_colorway_category = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let addColorwayCategoryQuery = 'INSERT INTO colorway_categories (colorway_category_name) VALUES (?)';
            database.execute(addColorwayCategoryQuery, [req.body.colorway_category_name], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway category added successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.update_colorway_category = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let updateColorwayCategoryQuery = 'UPDATE colorway_categories SET colorway_category_name = ? WHERE colorway_category_id = ?';
            database.execute(updateColorwayCategoryQuery, [req.body.colorway_category_name, req.body.colorway_category_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway category updated successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.delete_colorway_category = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let deleteColorwayCategoryQuery = 'DELETE a FROM colorway_images a INNER JOIN colorways b ON a.colorway_id=b.colorway_id WHERE b.colorway_category_id = ?; DELETE FROM colorways WHERE colorway_category_id = ?; DELETE FROM colorway_categories WHERE colorway_category_id = ?;';
            database.query(deleteColorwayCategoryQuery, [req.params.colorway_category_id, req.params.colorway_category_id, req.params.colorway_category_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway deleted successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.add_colorway_image = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let addColorwayImageQuery = 'INSERT INTO colorway_images (colorway_image_filename, colorway_id) VALUES (?, ?)';
            database.execute(addColorwayImageQuery, [req.body.colorway_image_filename, req.body.colorway_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway Image added successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.get_colorway_image = function(req, res) {
    let fileType;
    if(path.extname(req.params.filename)==='.jpg') {
        fileType='jpeg';
    } else {
        fileType=path.extname(req.params.filename).replace('.', '');
    }
    fs.readFile(appConfig.serverPath + '/colorway-images/'+req.params.filename, (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.writeHead(200, {'Content-Type': 'image/'+fileType});
            res.end(data);
        }

    });
};

exports.update_colorway_image = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let updateColorwayQuery = 'UPDATE colorway_images SET colorway_image_filename = ? WHERE colorway_id = ?';
            database.execute(updateColorwayQuery, [req.body.colorway_image_filename, req.body.colorway_image_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway image updated successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};

exports.upload_colorway_image = function(req, res) {
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

exports.delete_colorway_image = function(req, res) {
    if(verifyToken(req.token, appConfig.jwtKey)) {
        let decodedToken = jwt.decode(req.token);
        if (decodedToken.userLevel==='admin') {
            let deleteColorwayImageQuery = 'DELETE FROM colorway_images WHERE colorway_image_id = ?;';
            database.execute(deleteColorwayImageQuery, [req.params.colorway_image_id], function (err) {
                if (err) {
                    return res.status(500).json({'status': 'Database error', 'errors': err});
                } else {
                    return res.json({'status': 'Colorway image deleted successfully'});
                }
            });
        } else {
            return res.status(403).json({'status': 'Permission denied.'});
        }
    } else {
        return res.status(401).json({'status': 'Invalid token.'});
    }
};