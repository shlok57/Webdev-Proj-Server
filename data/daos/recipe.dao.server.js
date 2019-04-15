const mongoose = require('mongoose');
const recipeModel = require("../models/recipe/recipe.model.server");

createRecipe = recipe =>
    recipeModel.creaet(recipe);

findAllRecipes = () =>
    recipeModel.find();

findRecipeById = recipdId =>
    recipeModel.findById(recipeId);

updateRecipe = (recipeId, updatedRecipe) =>
    recipeModel.updateOne({_id: recipeId}, {$set: updatedRecipe})
        .then(() => recipeModel.findById(recipeId));

removeRecipe = recipdId =>
    recipeModel.deleteOne({_id: recipdId});

module.exports = {
    createRecipe,
    findAllRecipes,
    findRecipeById,
    updateRecipe,
    removeRecipe
}








