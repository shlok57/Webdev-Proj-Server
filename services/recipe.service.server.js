module.exports = app => {

    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
    app.get('/api/recipe/:id', findRecipeById);
    app.put('/api/recipe/:id', updateRecipe);
    app.delete('/api/recipe/:id', removeRecipe);
}

var recipeDao = require('../data/daos/recipe.dao.server');

createRecipe = (req, res) => {

    var recipe = req.body;
    if(recipe._id == null)
        recipe._id = new Date().getTime();

    recipeDao.createRecipe(recipe)
        .then(recipe => res.send(recipe));
}

findAllRecipes = (req, res) => {

    recipeDao.findAllRecipes()
        .then(recipes => res.send(recipes));
}

findRecipeById = (req, res) => {

    var id = req.params['id'];
    recipeDao.findRecipeById(id)
        .then(recipe => res.send(recipe));
}

updateRecipe = (req, res) => {
    var id = req.params['id'];
    var updatedRecipe = req.body;
    recipeDao.updateRecipe(id, updatedRecipe)
        .then(recipe => res.send(recipe));
}

removeRecipe = (req, res) => {
    var id = req.params['id'];
    recipeDao.removeRecipe(id)
        .then(response => res.send(response));
}

