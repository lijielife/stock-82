module.exports = function (app, passport) {


    app.route('/').get(function (req, res) {
        res.render("index",{title:"Stock"})
    });

};