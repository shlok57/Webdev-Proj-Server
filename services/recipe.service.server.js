module.exports = app => {

    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
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
