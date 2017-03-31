var mongoose = require('mongoose');

var schema = mongoose.Schema({

    date: {
        type: Date,
        required: false
    },
    hits: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: false
    }
});

mongoose.model('Url', schema);