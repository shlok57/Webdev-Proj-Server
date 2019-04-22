const mongoose = require('mongoose');
const commentModel = require("../models/comment/comment.model.server");

addComment = comment =>
    commentModel.create(comment)
        .catch(err => err.message);

findAllComments = () =>
    //TODO Populate user_id after model is added
    commentModel.find();

findCommentsByUserId = userId =>
    commentModel.find({'userId': userId});

findCommentsByRecipeId = recipeId =>
    commentModel.find({'recipeId': recipeId});

module.exports = {
    addComment,
    findCommentsByUserId,
    findCommentsByRecipeId,
    findAllComments
};
