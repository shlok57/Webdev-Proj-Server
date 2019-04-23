const mongoose = require("mongoose");
const likeModel = require("../models/like/like.model.server");

likeRecipe = (like) => {
    return likeModel.create(like);
}

unlikeRecipe = (unlike) => {
    return likeModel.deleteOne(unlike);
}

deleteLikesForRecipe = (recipeId) => {
    return likeModel.delete({recipe: recipeId});
}

deleteLikesForUser = (userId) => {
    return likeModel.delete({user: userId});
}

findLikedRecipesForUser = (userId) => {
    return likeModel
        .find({user: userId})
        .populate('recipe')
        .exec();
}

findLikedUsersForRecipe = (recipeId) => {
    return likeModel
        .find({recipe: recipeId})
        .populate('user')
        .exec();
}

module.exports = {
    likeRecipe,
    findLikedRecipesForUser,
    findLikedUsersForRecipe,
    unlikeRecipe,
    deleteLikesForRecipe,
    deleteLikesForUser
};
