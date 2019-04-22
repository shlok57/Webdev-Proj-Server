const mongoose = require('mongoose');
const commentModel = require("../models/comment/comment.model.server");

addComment = comment =>
    commentModel.create(comment)
        .catch(err => err.message);

findAllComments = () =>
    commentModel.find().populate('userId').populate('recipeId');

findCommentsByUserId = userId =>
    commentModel.find({'userId': userId}).populate('userId').populate('recipeId');

findCommentsByRecipeId = recipeId =>
    commentModel.find({'recipeId': recipeId}).populate('userId').populate('recipeId');

module.exports = {
    addComment,
    findCommentsByUserId,
    findCommentsByRecipeId,
    findAllComments
};
