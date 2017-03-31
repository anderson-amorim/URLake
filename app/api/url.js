let mongoose = require('mongoose');
let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let model = mongoose.model('Url');

    api.find = (req, res) => {
        console.log('api.find', req, res);
    };

    api.insert = (req, res) => {
        console.log('api.insert', req, res);
    };

    api.delete = (req, res) => {
        console.log('api.delete', req, res);
    };

    api.list = (req, res) => {
        console.log('api.list', req, res);
    };

    api.listById = (req, res) => {
        console.log('api.listById', req, res);
    };

    api.listByUser = (req, res) => {
        console.log('api.listAll', req, res);
    };

    api.listAll = (req, res) => {
        console.log('api.listAll', req, res);
    };

    return api;
};