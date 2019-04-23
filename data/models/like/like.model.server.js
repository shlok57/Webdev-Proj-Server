var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
module.exports = mongoose.model('LikeModel', likeSchema);
