var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
module.exports = mongoose.model('FollowModel', followSchema);
