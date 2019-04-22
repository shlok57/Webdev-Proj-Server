const mongoose = require("mongoose");
const userModel = require("../models/user/user.model.server");

findAllUsers = () => userModel.find();

findUserById = userId => userModel.findById(userId);

createUser = user => userModel.create(user).catch(err => err.message);

deleteUser = userId => userModel.remove(userId);

updateUser = (userId, user) =>
	userModel.updateOne({ _id: userId }, user).catch(err => err.message);

findUserByCredentials = (username, password) =>
	userModel.findOne({ username: username, password: password });

findUserByUsername = username => userModel.findOne({ username: username });

module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	deleteUser,
	updateUser,
	findUserByUsername,
	findUserByCredentials
};
