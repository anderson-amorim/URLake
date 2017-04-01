var mongoose = require('mongoose');

var schema = mongoose.Schema({

    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    hits: {
        type: Number,
        required: true,
        default: 0
    },
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}
});

mongoose.model('Url', schema);