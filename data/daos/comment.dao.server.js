const mongoose = require('mongoose');
const commentModel = require("../models/comment/comment.model.server");

addComment = comment =>
    commentModel.create(comment)
        .catch(err => err.message);

findCommentsByUserId = userId =>
    commentModel.find({'User_Id': userId});

findCommentsByRecipeId = recipeId =>
    commentModel.find({'Recipe_Id': recipeId});

module.exports = {
    addComment,
    findCommentsByUserId,
    findCommentsByRecipeId
};
