var userDao = require("../data/daos/user.dao.server");

module.exports = app => {
	app.post("/api/login", login);
	app.post("/api/register", registerUser);
	app.post("/api/logout", logout);
	app.put("/api/user/:uid", updateUser);
	app.delete("/api/user/:uid", deleteUser);
	app.get("/api/users", findAllUsers);
	app.get("/api/user/:uid", findUserById);
	app.get("/api/user", profile);
};

registerUser = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var role = req.body.role;
	var email = req.body.email;

	var newUser = {
		_id: new Date().getTime(),
		username: username,
		password: password,
		dateCreated: new Date(),
		role: role,
		email: email
	};
	userDao
		.findUserByUsername(username)
		.then(user => {
			if (!user) {
				return userDao.createUser(newUser);
			} else {
				res.send({ msg: "Username already exists" });
			}
		})
		.then(user => {
			req.session["currentUser"] = user;
			res.send(user);
		});
};

login = (req, res) => {
	user = req.body;
	userDao.findUserByCredentials(user.username, user.password).then(user => {
		if (user) {
			req.session["currentUser"] = user;
			res.send(user);
		} else {
			res.send(null);
		}
	});
};

logout = (req, res) => {
	req.session.destroy();
	res.send(200);
};

profile = (req, res) => {
	var user = req.session["currentUser"];
	if (user) {
		var userId = user["_id"];
		userDao.findUserById(userId).then(user => res.send(user));
	} else {
		res.send({ msg: "No Logged In User" });
	}
};

findAllUsers = (req, res) => {
	userDao.findAllUsers().then(users => res.send(users));
};

findUserById = (req, res) => {
	var userId = req.params["uid"];
	userDao.findUserById(userId).then(user => res.send(user));
};

updateUser = (req, res) => {
	var userId = req.params["uid"];
	var user = req.body;
	userDao
		.updateUser(userId, user)
		.then(() => userDao.findUserById(userId).then(user => res.send(user)));
};

deleteUser = (req, res) => {
	var userId = req.params["uid"];
	userDao.deleteUser(userId).then(() => res.sendStatus(200));
};
