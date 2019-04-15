const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    Name: {type: String, required: true},
    Date_Created: {type: Date, required: true},
    Moderator_ID: {type: mongoose.Schema.Types.Number, ref: 'UserModel', required: true},
    Ingredients: {type: String, required: true},
    Steps: [{type: String, required: true}],
    Image_URL: String,
    Video_URL: String,
    Cuisine: String,
    Category: String,
    Likes: Number
});
module.exports = recipeSchema;
