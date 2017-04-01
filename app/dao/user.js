let mongoose = require('mongoose');

module.exports = app => {

    let dao = {};
    let model = mongoose.model('User');

    dao.insert = (newUser) => {
        return new Promise((resolve, reject) => {
            model.findOne({
                username: newUser.username
            }).then(user => {
                if (user) {
                    reject(409);
                }
                newUser.date = new Date();
                model.create(newUser).then(user => {
                    resolve(user);
                }, error => {
                    throw error;
                });
            }, error => {
                reject(error);
            });
        });
    };

    dao.delete = (userid) => {
        console.log(userid);
        return new Promise((resolve, reject) => {
            model.remove({ username: userid }).then(() => {
                resolve(200);
            }, error => {
                logger.error(error);
                reject(500);
            });
        });
    };

    return dao;
};