const mongoose = require('mongoose');
const recipeModel = require("../models/recipe/recipe.model.server");

createRecipe = recipe =>
    recipeModel.create(recipe)
        .catch(err => err.message);

findAllRecipes = () =>
    recipeModel.find().populate('moderatorId').populate('users');

findRecipeById = recipeId =>
    recipeModel.findById(recipeId).populate('moderatorId').populate('users');

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








