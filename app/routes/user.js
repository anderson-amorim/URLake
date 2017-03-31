module.exports = app => {

    let api = app.api.user;

    app.route('/user')
        .post(api.insert);

    app.route('/user/:userId')
        .delete(api.delete);

};