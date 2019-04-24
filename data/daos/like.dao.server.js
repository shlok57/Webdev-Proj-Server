const mongoose = require("mongoose");
const likeModel = require("../models/like/like.model.server");

likeRecipe = like => {
	return likeModel.create(like);
};

unlikeRecipe = unlike => {
	return likeModel.deleteOne(unlike);
};

deleteLikesForRecipe = recipeId => {
	return likeModel.rmeove({ recipe: recipeId });
};

deleteLikesForUser = userId => {
	return likeModel.remove({ user: userId });
};

findLikedRecipesForUser = userId => {
	return likeModel
		.find({ user: userId })
		.populate("recipe")
		.exec();
};

findLikedUsersForRecipe = recipeId => {
	return likeModel.find({ recipe: recipeId }).populate("user");
};

getTotalLikesByRecipes = () => {
	return likeModel
		.aggregate([
			{
				$group: {
					_id: "$recipe",
					count: { $sum: 1 }
				}
			}
		])
		.sort({ count: -1 });
};

module.exports = {
	likeRecipe,
	findLikedRecipesForUser,
	findLikedUsersForRecipe,
	unlikeRecipe,
	deleteLikesForRecipe,
	deleteLikesForUser,
	getTotalLikesByRecipes
};
