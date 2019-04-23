var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    _id: Number,
    user: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
    recipe: {type: mongoose.Schema.Types.Number, ref: 'RecipeModel'}
}, {collection: 'like'});

module.exports = likeSchema;
