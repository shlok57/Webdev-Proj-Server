const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    _id: Number,
    Name: String,
    Date_Created: Date,
    Moderator_ID: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
    Ingredients: String,
    Steps: [String],
    Image_URL: String,
    Video_URL: String,
    Cuisine: String,
    Category: String,
    Likes: Number
});
module.exports = recipeSchema;
