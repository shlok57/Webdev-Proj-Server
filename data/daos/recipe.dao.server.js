const mongoose = require("mongoose");
const recipeModel = require("../models/recipe/recipe.model.server");

createRecipe = (recipe) => {
	return recipeModel.create(recipe);
}

findAllRecipes = () => {
	return recipeModel.find();
}

findAllCreatedRecipesForUser = (userId) => {
	return recipeModel.find({
		chef: userId
	});
}

findRecipeByYummlyId = (yummlyId) => {
	return recipeModel.findOne({yummlyId: yummlyId});
}

findRecipeById = (recipeId) => {
	return recipeModel.findOne({_id: recipeId});
}

findRecipesBySearchQuery = (recipeSearchText) => {
	console.log(recipeSearchText);
	return recipeModel.find({
		$text: {$search: recipeSearchText},
		createdBy: 'CHEF'
	})
}

findAllRecipesForChef = (userId) => {
	return recipeModel.find({chef: userId});
}

deleteRecipesForChef = (userId) => {
	return recipeModel.remove({chef: userId});
}

deleteRecipe = (recipeId) => {
	return recipeModel.deleteOne({_id: recipeId});
}

updateRecipe = (recipeId, newRecipe) => {
	return recipeModel.update({
		_id: recipeId
	},newRecipe
	);
}

module.exports = {
	createRecipe,
	findAllRecipes,
	findRecipeByYummlyId,
	findRecipesBySearchQuery,
	findAllCreatedRecipesForUser,
	findRecipeById,
	deleteRecipe,
	updateRecipe,
	findAllRecipesForChef,
	deleteRecipesForChef
}
