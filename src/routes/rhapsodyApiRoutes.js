'use strict';
module.exports = function(app) {
    var accountController = require('../controllers/accountController');
    var authController = require('../controllers/authController');
    var changePasswordController = require('../controllers/changePasswordController');
    var resetPasswordController = require('../controllers/resetPasswordController');
    var usersController = require('../controllers/usersController');
    var colorwaysController = require('../controllers/colorwaysController');
    var articlesController = require('../controllers/articlesController');

    app.route('/api/auth')
    .post(authController.login);

    app.route('/api/change-password')
    .put(changePasswordController.change_password);

    app.route('/api/profile')
    .put(accountController.update_account);

    app.route('/api/user')
    .get(usersController.get_users)
    .post(usersController.add_user);

    app.route('/api/user/:userId')
    .get(usersController.get_users)
    .put(usersController.update_user)
    .delete(usersController.delete_user);

    app.route('/api/sign-up')
    .post(usersController.sign_up);

    app.route('/api/validate/:userValidationString')
    .get(usersController.validate_user);

    app.route('/api/resend-validation/:userEmail')
    .get(usersController.resend_validation);

    app.route('/api/reset-password/:userEmail')
    .get(resetPasswordController.reset_password);

    app.route('/api/colorways')
        .post(colorwaysController.add_colorway)
        .get(colorwaysController.get_colorways)
        .put(colorwaysController.update_colorway)
        .delete(colorwaysController.delete_colorway);

    app.route('/api/colorways/:colorway_id')
        .delete(colorwaysController.delete_colorway);

    app.route('/api/colorway-categories')
        .post(colorwaysController.add_colorway_category)
        .get(colorwaysController.get_colorway_categories)
        .put(colorwaysController.update_colorway_category);

    app.route('/api/colorway-categories/:colorway_category_id')
        .delete(colorwaysController.delete_colorway_category);

    app.route('/api/colorway-image')
        .post(colorwaysController.add_colorway_image)
        .put(colorwaysController.update_colorway_image);

    app.route('/api/colorway-image/:colorway_image_id')
        .delete(colorwaysController.delete_colorway_image);

    app.route('/api/upload-colorway-image')
        .post(colorwaysController.upload_colorway_image);

    app.route('/api/articles/:tab')
        .get(articlesController.get_article)
        .put(articlesController.update_article);

    app.route('/api/articles')
        .get(articlesController.get_articles);

    app.route('/api/article-image')
        .post(articlesController.upload_image);

    app.route('/api/article-image/:filename')
        .get(articlesController.display_image);

    app.route('/api/colorway-image/:filename')
        .get(colorwaysController.get_colorway_image);
};