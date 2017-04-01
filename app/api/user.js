let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let dao = app.dao.user;

    api.insert = (req, res) => {
        if(!req.body.username) {
            res.sendStatus(500);
            return;
        }
        dao.insert(req.body).then(user => {
            res.status(201).json(user);
        }, error => {
            res.sendStatus(error == 409 ? 409 : 500);
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