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
        service: 'gmail',
        auth: {
            user: 'your@gmail.com', // Change this to the gmail username
            pass: 'yourpassword' // Change this to the gmail password
        }
    },
    jwtKey: '', // Change this to the jwt_key you wish to use
    appUrl: '', // Change this to the front end's main URL for the environment you are on
    environment: '', // Change this to 'dev' or 'production'
    useSSL: false, // change this to true to use SSL
    appPort: 3002, // change this to whatever port you set for the api to run on
    serverPath: 'c:/xampp/www/rhapsody-api/src/',
    sslOptions: {
        key: '', // change this to the path and filename of your key file
        cert: '' // change this to the path and filename of your certificate
    }
};
module.exports = appConfig;
