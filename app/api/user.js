let mongoose = require('mongoose');
let shortId = require('short-mongo-id');
let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let model = mongoose.model('User');

    api.insert = (req, res) => {
        model.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                res.status(409).send('Username already taken!');
                return;
            }
            req.body.date = new Date();
            model.create(req.body).then((user) => {
                res.status(201).json(user);
            }, (error) => {
                throw error;
            });
        }, error => {
            logger.error(error);
            res.sendStatus(500);
        });
    };

    api.delete = (req, res) => {
        console.log('api.delete', req, res);
        res.sendStatus(200);
    };

    return api;
};