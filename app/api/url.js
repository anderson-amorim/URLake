let mongoose = require('mongoose');
let shortId = require('short-mongo-id');
let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let model = mongoose.model('Url');
    let userModel = mongoose.model('User');

    api.find = (req, res) => {
        let id = req.params.id;
        model.findOneAndUpdate(
            { _id: id },
            { $inc: { hits: 1 } },
            { new: true }
        ).then(url => {
            res.status(301).send(url.url);
        }, error => {
            logger.error(error);
            res.sendStatus(404);
        });
    };

    api.insert = (req, res) => {
        userModel.findOne({
            username: req.params.userid
        }).then(user => {
            let url = req.body;
            url._id = mongoose.Types.ObjectId();
            url.shortUrl = req.get('host') + '/' + shortId(url._id);
            url.user = user;
            model.create(req.body).then(url => {
                res.status(201).json(url);
            }, error => {
                throw error;
            });
        }, error => {
            logger.error(error);
            res.sendStatus(500);
        });
    };

    api.delete = (req, res) => {
        res.sendStatus(200);
    };

    api.listById = (req, res) => {
        res.json(req.body);
    };

    api.listByUser = (req, res) => {
        userModel.findOne({
            username: req.params.userid
        }).then(user => {
            model.aggregate([
                { $match: { user: mongoose.Types.ObjectId(user._id) } },
                { $group: { _id: null, hits: { $sum: "$hits" }, urlCount: { $sum: 1 } } },
                { $project: { _id: 0 } }
            ]).then(result => {
                if(!result.length) {
                    res.sendStatus(404);
                    return;
                }
                let status = result[0];
                model.find({ user: user._id }).sort({ hits: -1 }).limit(10).then(topUrls => {
                    status.topUrls = topUrls;
                    res.status(200).json(status);
                }, error => {
                    throw error;
                });
            }, error => {
                throw error;
            });
        }, error => {
            logger.error(error);
            res.sendStatus(404);
        });
    };

    api.listAll = (req, res) => {
        model.aggregate([
            { $group: { _id: null, hits: { $sum: "$hits" }, urlCount: { $sum: 1 } } },
            { $project: { _id: 0 } }
        ]).then(result => {
            let status = result[0];
            model.find().sort({ hits: -1 }).limit(10).then(topUrls => {
                status.topUrls = topUrls;
                res.status(200).json(status);
            }, error => {
                throw error;
            });
        }, error => {
            logger.error(error);
            res.status(404).json(req.body);
        });
    };

    return api;
};