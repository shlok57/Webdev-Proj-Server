var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model('FollowModel', followSchema);
