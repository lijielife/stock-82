poll = require('./poll')
module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.session.user) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    app.route('/').get(poll.allPolls);

    //authenticate
    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            req.session.destroy(function(err) {
                // cannot access session here
            })
            res.redirect('/');
        });
    app.route('/auth/github')
        .get(passport.authenticate('github',{session:false}));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            session:false,
        }), function (req, res) {
            console.log(req.user)
            req.session.user = req.user;
            res.redirect('/');
        });


    //poll
    // app.route('/mypolls').get(isLoggedIn, movie.movieAdd);
    app.route('/newpoll').get(isLoggedIn,poll.newPoll);//提交
    app.route('/newpoll').post(isLoggedIn,poll.postNewPoll);//提交
    app.route('/polls/:id').get(isLoggedIn,poll.getPoll);//提交
    app.route('/polls/:id').post(isLoggedIn,poll.postEditPoll);//提交
    app.route('/api/poll/:id').get(isLoggedIn,poll.getPollById);//提交
    app.route('/mypolls').get(isLoggedIn,poll.myPolls);//提交

    app.use(function (req, res) {
        res.render("404");
    });
};