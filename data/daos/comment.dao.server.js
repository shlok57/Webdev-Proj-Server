const mongoose = require('mongoose');
const commentModel = require("../models/comment/comment.model.server");

addComment = comment =>
    commentModel.create(comment)
        .catch(err => err.message);

findAllComments = () =>
    //TODO Populate user_id after model is added
    commentModel.find().populate('Recipe_Id');

findCommentsByUserId = userId =>
    commentModel.find({'User_Id': userId});

findCommentsByRecipeId = recipeId =>
    commentModel.find({'Recipe_Id': recipeId});

module.exports = {
    addComment,
    findCommentsByUserId,
    findCommentsByRecipeId,
    findAllComments
};
