let mongoose = require('mongoose');
let logger = require('../services/logger.js');

module.exports = app => {

    let api = {};
    let model = mongoose.model('User');

    api.insert = (req, res) => {
        console.log('api.insert', req, res);
    };

    api.delete = (req, res) => {
        console.log('api.delete', req, res);
    };

    return api;
};