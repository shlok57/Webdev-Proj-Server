const mongoose = require('mongoose');
const followModel = require("../models/follow/follow.model.server");

followUser = (follow) => {
    return followModel.create(follow);
}

unfollowUser = (unfollow) => {
    return followModel.remove(unfollow);
}

deleteFollowingsForUser = (userId) => {
    return followModel.remove({from: userId});
}

deleteFollowersForUser = (userId) => {
    return followModel.remove({to: userId});
}

getFollowing = (userId) => {
    return followModel
        .find({from: userId})
        .populate('to')
        .exec();
}

getFollowers = (userId) => {
    return followModel
        .find({to: userId})
        .populate('from')
        .exec();
}

module.exports = {
    followUser,
    getFollowing,
    getFollowers,
    unfollowUser,
    deleteFollowersForUser,
    deleteFollowingsForUser
};
