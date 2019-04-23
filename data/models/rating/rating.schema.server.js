var mongoose = require('mongoose');

var ratingSchema = mongoose.Schema({
    _id: Number,
    user: {type: mongoose.Schema.Types.Number, ref:'UserModel'},
    recipe: {type: mongoose.Schema.Types.Number, ref: 'RecipeModel'},
    rating: Number,
    review: String
}, {collection: 'rating'});

module.exports = ratingSchema;
