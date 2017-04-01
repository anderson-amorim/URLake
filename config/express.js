let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let path = require('path');
let morgan = require('morgan');
let logger = require('../app/services/logger.js');
let app = express();

app.use(morgan("dev", {
    stream: {
        write: log => {
            logger.debug(`MORGAN: ${log}`);
        }
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }

});

consign({ cwd: 'app' })
    .include('models')
    .then('dao')
    .then('api')
    .then('routes')
    .then('services')
    .into(app);

module.exports = app;