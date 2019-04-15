module.exports = app => {

    app.post('/api/user/:uid/recipe/:rid/comment', addComment);
    app.get('/api/comment', findAllComments);
};

var commentDao = require('../data/daos/comment.dao.server');

addComment = (req, res) => {
    var userId = req.params['uid'];
    var recipeId = req.params['rid'];
    var comment = req.body;
    comment.User_Id = userId;
    comment.Recipe_Id = recipeId;
    if(comment._id == null)
        comment._id = new Date().getTime();

    commentDao.addComment(comment)
        .then(comment => res.send(comment));
}

findAllComments = (req, res) => {
    commentDao.findAllComments()
        .then(comments => res.send(comments));
}


