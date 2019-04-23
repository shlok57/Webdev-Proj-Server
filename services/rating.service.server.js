module.exports = (app) => {



    var ratingDao = require('../data/daos/rating.dao.server');

    findRatedRecipesForCurrentUser = (req, res) => {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        ratingDao
            .findRatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    findRatedRecipesForUser = (req, res) => {
        var userId = req.params['userId'];
        ratingDao
            .findRatedRecipesForUser(userId)
            .then(recipes => res.json(recipes));
    }

    findRatedUsersForRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        ratingDao
            .findRatedUsersForRecipe(recipeId)
            .then(users => res.json(users));
    }

    rateRecipe = (req, res) => {
        var recipeId = req.params['recipeId'];
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var ratingObject = req.body;
        var rating = {
            _id: new Date().getTime(),
            user: userId,
            recipe: recipeId,
            rating: ratingObject['rating']
        };
        if (ratingObject['review']) {
            rating['review'] = ratingObject['review'];
        }
        ratingDao
            .rateRecipe(rating)
            .then(response => res.json(response));
    }

    updateRating = (req, res) => {
        var ratingId = req.params['ratingId'];
        var ratingObject = req.body;
        ratingDao
            .updateRating(ratingId, ratingObject)
            .then(status => res.send(status));
    }

    app.post('/api/recipe/:recipeId/rating', rateRecipe);
    app.put('/api/rating/:ratingId', updateRating);
    app.get('/api/user/ratedRecipe', findRatedRecipesForCurrentUser);
    app.get('/api/user/:userId/ratedRecipe', findRatedRecipesForUser);
    app.get('/api/recipe/:recipeId/ratedUser', findRatedUsersForRecipe);
}
