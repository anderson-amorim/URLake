var mongoose = require('mongoose');

var schema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    }

});

mongoose.model('User', schema);