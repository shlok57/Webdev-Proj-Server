var mongoose = require('mongoose');
var userModel = require('../models/user/user.model.server')

createUser = (user) => {
	return userModel.create(user);
};

findUserByCredentials = (credentials) => {
	return userModel.findOne(credentials, {password: 0});
}

findAllUsers = () => {
	return userModel.find();
}

findUserById = (userId) => {
	return userModel.findOne({_id: userId});
}

findUserByUsername = (username) => {
	return userModel.find({username: username});
}

updateUser = (userId, newUser) => {
	return userModel.updateOne({
		_id: userId
	},newUser);
}

deleteUser = (userId) => {
	return userModel.deleteOne({_id: userId});
}

module.exports = {
	createUser,
	findUserByCredentials,
	updateUser,
	findUserByUsername,
	deleteUser,
	findUserById,
	findAllUsers
};

