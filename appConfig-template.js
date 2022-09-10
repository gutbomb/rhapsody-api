const appConfig = {
    dbConnect: {
        host: '', // Change this to the mysql hostname
        user: '', // Change this to the mysql user
        password: '', // Change this to the mysql password
        database: '', // Change this to the mysql database
        port: 3306, // Change this to the mysql port
        multipleStatements: true // Leave this alone
    },
    mailConfig: {
        host: '',
        port: 465,
        auth: {
          user: '',
          pass: '',
        },
        secure: true,
        logger: true,
        debug: true,
    },
    jwtKey: '', // Change this to the jwt_key you wish to use
    appUrl: '', // Change this to the front end's main URL for the environment you are on
    environment: '', // Change this to 'dev' or 'production'
    useSSL: false, // change this to true to use SSL
    appPort: 3002, // change this to whatever port you set for the api to run on
    serverPath: '', //change this to whatever path the app.js is in
    sslOptions: {
        key: '', // change this to the path and filename of your key file
        cert: '' // change this to the path and filename of your certificate
    }
};
module.exports = appConfig;
