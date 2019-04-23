module.exports = (app ) => {

    var likeDao = require('../data/daos/like.dao.server');
    var recipeDao  = require('../data/daos/recipe.dao.server');


    findLikedUsersForRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        likeDao
            .findLikedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    findLikedRecipesForCurrentUser = (req, res) => {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        likeDao
            .findLikedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    findLikedRecipesForUser = (req, res) => {
        var userId = req.params['userId'];
        likeDao
            .findLikedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    likeRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var like = {
            _id: new Date().getTime(),
            user: userId,
            recipe: recipeId
        }

        likeDao
            .likeRecipe(like)
            .then(response => res.json(response));
    }

    unlikeRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var unlike = {
            user: userId,
            recipe: recipeId
        }
        likeDao
            .unlikeRecipe(unlike)
            .then(response => res.json(response));
    }



    getTotalLikesByRecipes = (req, res) => {

       var likesByRecipeId =  likeDao.getTotalLikesByRecipes().then(response => res.json(response));
       var promiseArr = [];
       for(var likesByRep in Object.values(likesByRecipeId)) {
           promiseArr.push(recipeDao.findRecipeById(likesByRep._id)
               .then(recipe => likesByRep.recipe = recipe));
       }
    }


    app.post('/api/recipe/:recipeId/like', likeRecipe);
    app.delete('/api/recipe/:recipeId/unlike', unlikeRecipe)
    app.get('/api/user/likedRecipe', findLikedRecipesForCurrentUser);
    app.get('/api/user/:userId/likedRecipe', findLikedRecipesForUser);
    app.get('/api/recipe/:recipeId/likedUser', findLikedUsersForRecipe);
    app.get('/api/topLike', getTotalLikesByRecipes);
}
