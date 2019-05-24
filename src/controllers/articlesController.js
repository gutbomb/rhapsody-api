const Database = require('../database.js');

var database = new Database();


exports.get_article = function(req, res) {
    let articleObject, imageRows,
        articleQuery = "select articles.*, user_first_name, user_last_name from articles JOIN users ON article_author = user_id WHERE article_tab = '" + req.params.tab + "'",
        articleImagesQuery = "select article_images.*, article_image_type_class from articles JOIN article_images ON articles.article_id = article_images.article_id JOIN article_image_types ON article_image_type = article_image_type_id WHERE article_tab = '" + req.params.tab + "'";

    database.query(articleQuery)
        .then((rows) => {
            if(rows.length) {
                articleObject = rows;
                return (database.query(articleImagesQuery));
            }
        })
        .then((rows) => {
                imageRows = rows;
        })
        .then(() => {
            articleObject.forEach((e, i, a) => {
                a[i].images=[];
            });
        })
        .then(() => {
            articleObject.forEach((article, articleIndex, articleArray) => {
                imageRows.forEach((image) =>{
                    if(article.article_id === image.article_id) {
                        articleArray[articleIndex].images.push(image);
                    }
                });
            });
        })
        .then(() => {
            return res.json(articleObject);
        }, () => {
            return res.sendStatus(404);
        });
};