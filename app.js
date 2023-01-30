const express = require('express'),
    https = require('https'),
    app = express(),
    fs = require('fs'),
    appConfig = require('./appConfig.js'),
    port = appConfig.appPort,
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token'),
    cors = require('cors');
    
if(appConfig.useSSL) {
    const sslOptions = {
        key: fs.readFileSync(appConfig.sslOptions.key),
        cert: fs.readFileSync(appConfig.sslOptions.cert)
    };
}

app.use(cors({
    origin: 'https://rhapsodyfiber.com'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());;
app.use(bearerToken());



const routes = require('./routes/rhapsodyApiRoutes');
routes(app);

if(appConfig.environment === 'production') {
    app.listen();
    console.log('rhapsody API server started');
} else {
    if(appConfig.useSSL) {
        https.createServer(sslOptions, app).listen(port);
        console.log('secure rhapsody API server started on: ' + port);
    } else {
        app.listen(port);
        console.log('rhapsody API server started on: ' + port);
    }
}
