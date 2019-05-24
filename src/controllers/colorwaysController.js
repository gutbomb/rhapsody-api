const Database = require('../database.js');

var database = new Database();


exports.get_colorways = function(req, res) {
    let colorwaysObject, colorwayRows, imageRows,
        colorwayCategoriesQuery = "select * from colorway_categories",
        colorwaysQuery = "select * from colorways",
        colorwayImagesQuery = "select * from colorway_images";

    database.query(colorwayCategoriesQuery)
        .then((rows) => {
            colorwaysObject = rows;
            return (database.query(colorwaysQuery));
        })
        .then((rows) => {
            colorwayRows = rows;
            return (database.query(colorwayImagesQuery));
        })
        .then((rows) => {
            imageRows = rows;
            // return database.close();
        })
        .then(() => {
            colorwaysObject.forEach((e, i, a) => {
                a[i].colorways=[];
            });
            colorwayRows.forEach((e, i, a) => {
                a[i].images=[];
            });
        })
        .then(() => {
            colorwayRows.forEach((colorway, colorwayIndex, colorwayArray) => {
                imageRows.forEach((image) =>{
                    if(colorway.colorway_id === image.colorway_id) {
                        colorwayArray[colorwayIndex].images.push(image);
                    }
                });
            });
        })
        .then(() => {
            colorwaysObject.forEach((category, categoryIndex, categoryArray) => {
                colorwayRows.forEach((colorway) =>{
                    if(category.colorway_category_id === colorway.colorway_category_id) {
                        categoryArray[categoryIndex].colorways.push(colorway);
                    }
                });
            });
        })
        .then(() => {
            return res.json(colorwaysObject);
        });
};