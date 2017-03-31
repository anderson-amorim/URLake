module.exports = app => {

    let api = app.api.url;

    app.route('/urls/:id')
        .get(api.find)
        .delete(api.delete);

    app.route('/users/:userid/urls')
        .post(api.insert);

    app.route('/stats')
        .get(api.listAll);

    app.route('/stats/:id')
        .get(api.listById);

    app.route('/users/:userid/stats')
        .post(api.listByUser);
};