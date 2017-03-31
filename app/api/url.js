let mongoose = require('mongoose');
let shortId = require('short-mongo-id');
let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let model = mongoose.model('Url');

    api.find = (req, res) => {
        console.log('api.find', req, res);
    };

    api.insert = (req, res) => {
        console.log('api.insert', req.body);
        //console.log(`${req.get('host')}/${shortId(user._id)}`);
        res.json(req.body);
    };

    api.delete = (req, res) => {
        console.log('api.delete', req, res);
        res.sendStatus(200);
    };

    api.listById = (req, res) => {
        console.log('api.listById', req, res);
        res.json(req.body);
    };

    api.listByUser = (req, res) => {
        console.log('api.listAll', req, res);
        res.json(req.body);
    };

    api.listAll = (req, res) => {
        console.log('api.listAll', req, res);
        res.status(200).json(req.body);
        //if not found res.status(404).json(req.body);
    };

    return api;
};