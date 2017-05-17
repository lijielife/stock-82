var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var OptionSchema = new Schema({
    option:String,
    count:Number
})
var Option = mongodb.mongoose.model("Option", OptionSchema);

var PollSchema = new Schema({
    title: String,
    poller:String,
    options : [OptionSchema],

});
var Poll = mongodb.mongoose.model("Poll", PollSchema);
var PollDao = function(){};


PollDao.prototype.save = function(obj, callback) {
    var instance = new Poll(obj);
    instance.save(function(err,doc){
        callback(err,doc);
    });
};

PollDao.prototype.findById = function(id, callback) {
    Poll.findById(id, function(err, obj){
        callback(err, obj);
    });
};

PollDao.prototype.updateById = function (id, data, callback) {
    Option.findByIdAndUpdate(id, data, function (err, doc) {
        callback(err,doc)
    });

}

PollDao.prototype.findByUserId = function(id, callback) {
    Poll.find({poller:id},function (err, doc) {
        callback(err,doc)
    })
};

PollDao.prototype.findAll = function(callback) {
    Poll.find({},function (err, doc) {
        callback(err,doc)
    })
};


module.exports = new PollDao();