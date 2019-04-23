module.exports = (app) => {

    var followDao = require('../data/daos/follow.dao.server');



    followUser = (req, res) => {
        var toUserId = req.params['userId'];
        var currentUser = req.session.currentUser;
        var fromUserId = currentUser._id;
        var follow = {
            _id: new Date().getTime(),
            from: fromUserId,
            to: toUserId
        }
        followDao
            .followUser(follow)
            .then(response => res.json(response));
    }

    unfollowUser = (req, res) => {
        var toUserId = req.params['userId'];
        var currentUser = req.session.currentUser;
        var fromUserId = currentUser._id;
        var unfollow = {
            from: fromUserId,
            to: toUserId
        }
        followDao
            .unfollowUser(unfollow)
            .then(response => res.json(response));
    }

    getFollowing = (req, res) => {
        var userId = req.params['userId'];
        followDao
            .getFollowing(userId)
            .then(following => res.json(following));
    }

    getFollowingForCurrentUser = (req, res) => {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        followDao
            .getFollowing(userId)
            .then(following => res.json(following));
    }

    getFollowers = (req, res) => {
        var userId = req.params['userId'];
        followDao
            .getFollowers(userId)
            .then(followers => res.json(followers));
    }

    getFollowersForCurrentUser = (req, res) => {
        var currentUser = req.session['currentUser'];
        var userId = currentUser._id;
        followDao
            .getFollowers(userId)
            .then(followers => res.json(followers));
    }

    app.post('/api/user/:userId/follow', followUser);
    app.delete('/api/user/:userId/unfollow', unfollowUser);
    app.get('/api/user/:userId/following', getFollowing);
    app.get('/api/user/:userId/followers', getFollowers);
    app.get('/api/user/following', getFollowingForCurrentUser);
    app.get('/api/user/followers', getFollowersForCurrentUser);
}
