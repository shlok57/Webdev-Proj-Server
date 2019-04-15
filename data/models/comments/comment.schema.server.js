const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    User_Id: {type: mongoose.Schema.Types.Number, ref: 'UserModel', required: true},
    Recipe_Id: {type: mongoose.Schema.Types.Number, ref: 'RecipeModel', required: true},
    Comment: {type: String, required: true}
}, {collection: 'comments'});
module.exports = commentSchema;
