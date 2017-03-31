var mongoose = require('mongoose');

var schema = mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    }

});

mongoose.model('User', schema);