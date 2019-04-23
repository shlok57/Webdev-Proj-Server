module.exports = (app) => {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe', findAllRecipes);
    app.get('/api/user/createdRecipe', findAllCreatedRecipesForCurrentUser);
    app.get('/api/user/:userId/createdRecipe', findAllCreatedRecipesForUser);
    app.get('/api/recipe/search/:recipeSearchText', findRecipesBySearchQuery)
    app.get('/api/recipe/yummly/:yummlyId', findRecipeByYummlyId);
    app.get('/api/recipe/:recipeId', findRecipeById);
    app.delete('/api/recipe/:recipeId', deleteRecipe);
    app.put('/api/recipe/:recipeId', updateRecipe);

    var recipeDao = require('../data/daos/recipe.dao.server');
    var likeDao = require('../data/daos/like.dao.server');
    var ratingDao = require('../data/daos/rating.dao.server');

    createRecipe = (req, res) => {
        var recipe = req.body;
        recipeDao.createRecipe(recipe)
            .then(recipe => res.send(recipe));
    }

    deleteRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        likeDao.deleteLikesForRecipe(recipeId)
            .then(() => ratingDao.deleteRatingsForRecipe(recipeId))
            .then(() => recipeDao.deleteRecipe(recipeId))
            .then(response => res.send(response));
    }

    updateRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        var recipeObject = req.body;
        recipeDao.updateRecipe(recipeId, recipeObject)
            .then(status => res.send(status));
    }

    findAllRecipes = (req, res) => {
        recipeDao.findAllRecipes()
            .then(recipes => res.send(recipes));
    }

    findAllCreatedRecipesForCurrentUser = (req, res) => {
        var currentUser = req.session['currentUser'];
        var userId = currentUser['_id'];
        recipeDao.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    findAllCreatedRecipesForUser = (req, res) => {
        var userId = req.params['userId'];
        recipeDao.findAllCreatedRecipesForUser(userId)
            .then(recipes => res.json(recipes))
    }

    findRecipesBySearchQuery = (req, res) => {
        var recipeSearchText = req.params['recipeSearchText'];
        recipeDao.findRecipesBySearchQuery(recipeSearchText)
            .then(recipes => res.json(recipes));
    }

    findRecipeByYummlyId = (req, res) => {
        var yummlyId = req.params['yummlyId'];
        recipeDao.findRecipeByYummlyId(yummlyId)
            .then(recipe => res.send(recipe));
    }

    findRecipeById = (req, res) => {
        var recipeId = req.params['recipeId'];
        recipeDao.findRecipeById(recipeId)
            .then(recipe => res.send(recipe));
    }
}
