const express = require('express'),
    app = express(),
    appConfig = require('./appConfig.js'),
    port = appConfig.appPort,
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token');






app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bearerToken());


const routes = require('./routes/rhapsodyApiRoutes');
routes(app);

app.listen(port);
console.log('rhapsody RESTful API server started on: ' + port);