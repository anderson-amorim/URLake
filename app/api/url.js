let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let dao = app.dao.url;

    api.find = (req, res) => {
        dao.findAndUpdate(req.params.id).then(url => {
            res.redirect(301, url.url)
        }, error => {
            logger.error(error);
            res.sendStatus(404);
        });
    };

    api.findById = (req, res) => {
        dao.findById(req.params.id).then(url => {
            res.json(url);
        }, error => {
            logger.error(error);
            res.sendStatus(404);
        });
    };

    api.insert = (req, res) => {
        let userid = req.params.userid;
        let url = req.body;
        let host = req.get('host');

        if(!userid || !url || !url.url) {
            res.sendStatus(500);
            return;
        }

        dao.insert(userid, url, host).then(url => {
            res.status(201).json(url);
        }, error => {
            logger.error(error);
            res.sendStatus(500);
        });
    };

    api.delete = (req, res) => {
        dao.delete(req.params.id).then(() => {
            res.sendStatus(200);
        }, error => {
            logger.error(error);
            res.sendStatus(500);
        });
    };

    api.listByUser = (req, res) => {
        dao.listByUser(req.params.userid).then(status => {
            res.status(200).json(status);
        }, error => {
            logger.error(error);
            res.sendStatus(404);
        });
    };

    api.listAll = (req, res) => {
        dao.listAll().then(status => {
            res.status(200).json(status);
        }, error => {
            logger.error(error);
            res.status(404).json(req.body);
        });
    };

    return api;
};