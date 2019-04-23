const mongoose = require("mongoose");
const ratingMode = require("../models/rating/rating.model.server");

rateRecipe = (rating) => {
    return ratingModel.create(rating);
}

deleteRatingsForRecipe = (recipeId) => {
    return ratingModel.remove({recipe: recipeId});
}

deleteRatingsForUser = (userId) => {
    return ratingModel.remove({user: userId});
}

updateRating = (ratingId, ratingObject) => {
    if (ratingObject['review']) {
        return ratingModel.update(
            {_id: ratingId}, {
                $set: {
                    rating: ratingObject['rating'],
                    review: ratingObject['review']
                }
            })
    } else {
        return ratingModel.update(
            {_id: ratingId}, {
                $set: {
                    rating: ratingObject['rating'],
                }
            })
    }
}

findRatedRecipesForUser = (userId) => {
    return ratingModel
        .find({user: userId})
        .populate('recipe')
        .exec();
}

findRatedUsersForRecipe = (recipeId) => {
    return ratingModel
        .find({recipe: recipeId})
        .populate('user')
        .exec();
}

var api = {
    rateRecipe,
    findRatedRecipesForUser,
    findRatedUsersForRecipe,
    updateRating,
    deleteRatingsForRecipe,
    deleteRatingsForUser
};

module.exports = api;
