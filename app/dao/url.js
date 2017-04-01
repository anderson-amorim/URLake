let mongoose = require('mongoose');
let shortId = require('short-mongo-id');

module.exports = app => {

    let dao = {};
    let model = mongoose.model('Url');
    let userModel = mongoose.model('User');

    dao.findAndUpdate = (urlId) => {
        return new Promise((resolve, reject) => {
            model.findOneAndUpdate(
                { _id: urlId },
                { $inc: { hits: 1 } },
                { new: true }
            ).then(url => {
                resolve(url)
            }, error => {
                reject(error);
            });
        });
    };

    dao.findById = (urlId) => {
        return new Promise((resolve, reject) => {
            model.findOne(
                { _id: urlId }
            ).then(url => {
                resolve(url);
            }, error => {
                reject(error);
            });
        });
    };

    dao.insert = (userid, url, host) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({
                username: userid
            }).then(user => {
                url._id = mongoose.Types.ObjectId();
                url.shortUrl = host + '/' + shortId(url._id);
                url.user = user;
                model.create(url).then(url => {
                    resolve(url);
                }, error => {
                    throw error;
                });
            }, error => {
                reject(error);
            });
        });
    };

    dao.delete = (urlId) => {
        return new Promise((resolve, reject) => {
            model.remove({ _id: urlId }).then(() => {
                resolve(200);
            }, error => {
                reject(error);
            });
        });
    };

    dao.listByUser = (userid) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({
                username: userid
            }).then(user => {
                model.aggregate([
                    { $match: { user: mongoose.Types.ObjectId(user._id) } },
                    { $group: { _id: null, hits: { $sum: "$hits" }, urlCount: { $sum: 1 } } },
                    { $project: { _id: 0 } }
                ]).then(result => {
                    if (!result.length) {
                        reject(404);
                    }
                    let status = result[0];
                    model.find({ user: user._id }).sort({ hits: -1 }).limit(10).then(topUrls => {
                        status.topUrls = topUrls;
                        resolve(status);
                    }, error => {
                        throw error;
                    });
                }, error => {
                    throw error;
                });
            }, error => {
                reject(error);
            });
        });
    };

    dao.listAll = () => {
        return new Promise((resolve, reject) => {
            model.aggregate([
                { $group: { _id: null, hits: { $sum: "$hits" }, urlCount: { $sum: 1 } } },
                { $project: { _id: 0 } }
            ]).then(result => {
                let status = result[0];
                model.find().sort({ hits: -1 }).limit(10).then(topUrls => {
                    status.topUrls = topUrls;
                    resolve(status);
                }, error => {
                    throw error;
                });
            }, error => {
                reject(error);
            });
        });
    };

    return dao;
};