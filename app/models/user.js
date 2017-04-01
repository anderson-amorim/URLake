var mongoose = require('mongoose');

var schema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

});

mongoose.model('User', schema);