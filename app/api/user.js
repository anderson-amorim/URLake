let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let dao = app.dao.user;

    api.insert = (req, res) => {
        dao.insert(req.body).then(user => {
            res.status(201).json(user);
        }, error => {
            logger.error(error);
            res.status(error == 409 ? 409 : 500);
        });
    };

    api.delete = (req, res) => {
        dao.delete(req.params.userId).then(() => {
            res.sendStatus(200);
        }, error => {
            logger.error(error);
            res.sendStatus(500);
        });
    };

    return api;
};