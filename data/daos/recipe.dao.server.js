const mongoose = require("mongoose");
const recipeModel = require("../models/recipe/recipe.model.server");

createRecipe = recipe => recipeModel.create(recipe).catch(err => err.message);

findAllRecipes = () => recipeModel.find();

findRecipeById = recipeId => recipeModel.findById(recipeId);

updateRecipe = (recipeId, updatedRecipe) =>
	recipeModel
		.updateOne({ _id: recipeId }, { $set: updatedRecipe })
		.then(() => recipeModel.findById(recipeId));

removeRecipe = recipdId => recipeModel.deleteOne({ _id: recipdId });

module.exports = {
	createRecipe,
	findAllRecipes,
	findRecipeById,
	updateRecipe,
	removeRecipe
};
