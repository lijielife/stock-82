var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');
exports.mongoose = mongoose;