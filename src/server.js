const express = require('express'),
    https = require('https'),
    app = express(),
    fs = require('fs'),
    appConfig = require('./appConfig.js'),
    port = appConfig.appPort,
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token'),
    sslOptions = {
        key: fs.readFileSync(appConfig.sslOptions.key),
	cert: fs.readFileSync(appConfig.sslOptions.cert)
    };



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

if(appConfig.useSSL) {
    https.createServer(sslOptions, app).listen(port);
    console.log('secure rhapsody RESTful API server started on: ' + port);
} else {
    app.listen(port);
    console.log('rhapsody RESTful API server started on: ' + port);
}
