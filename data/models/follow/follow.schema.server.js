var mongoose = require('mongoose');

var followSchema = mongoose.Schema({
    _id: Number,
    from: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
    to: {type: mongoose.Schema.Types.Number, ref: 'UserModel'}
}, {collection: 'follow'});

module.exports = followSchema;
