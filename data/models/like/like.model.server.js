var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model('LikeModel', likeSchema);
