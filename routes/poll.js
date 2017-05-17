var Poll = require('./../models/poll');

exports.newPoll = function(req, res) {
    res.render("poll/newpoll",{title:"New Poll",user:req.session.user})
};

exports.postNewPoll = function (req,res) {
    var title = req.body.title
    console.log(req.session.user)
    var options = req.body.options.split("\r\n")

    var instance = {}
    instance.title = title;
    instance.poller = req.session.user._id
    instance.options = options.map(function (option) {
        var obj = {}
        obj.option = option
        obj.count = 0

        return obj
    })

    Poll.save(instance,function (err, obj) {
        if (err){
            res.render("error",{message:"error"})
        } else {
            res.redirect("/polls/" + obj._id)
        }
    })

}

exports.getPoll = function (req, res) {
    res.render("poll/poll",{title:"Poll",user:req.session.user})
}

exports.getPollById = function (req, res) {
    var id = req.params.id
    console.log(id)
    Poll.findById(id,function (err, doc) {
        console.log(doc)
        res.send(doc)
    })
}

exports.postEditPoll = function (req, res) {
    var id = req.params.id

    Poll.findById(id,function (err, doc) {
        var option = doc.options.id(req.body.selected_id)
        console.log("option:" + option)
        option.count++
        doc.save(function (err) {
            if (!err){
                res.redirect("/polls/" + id)
            }
        })
    })
}

exports.myPolls = function (req, res) {
    var id = req.session.user._id;

    Poll.findByUserId(id,function (err, doc) {
        if (err){
            res.redirect("/")
        } else {
            console.log(doc)
            res.render("poll/mypolls",{title:"My Polls",user:req.session.user, polls:doc,url:process.env.APP_URL})
        }
    })
}

exports.allPolls = function (req, res) {

    Poll.findAll(function (err, doc) {
        if (err){
            res.redirect("/")
        } else {
            console.log(doc)
            res.render("index",{title:"Home",user:req.session.user, polls:doc,url:process.env.APP_URL})
        }
    })
}