var mongoose = require('mongoose');

var followSchema = mongoose.Schema({
    _id: Number,
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'follow'});

module.exports = followSchema;
