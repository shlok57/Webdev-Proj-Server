var userDao = require("../data/daos/user.dao.server");

module.exports = app => {
	app.post("/api/login", login);
	app.post("/api/register", registerUser);
	app.post("/api/logout", logout);
	app.put("/api/updateUser/:uid", updateUser);
	app.delete("/api/deleteUser/:uid", deleteUser);
	app.get("/api/users", findAllUsers);
	app.get("/api/user/:uid", findUserById);
	app.get("/api/user", profile);
};

registerUser = (req, res) => {
	var username = req.body.Username;
	var password = req.body.Password;
	var newUser = {
		_id: new Date().getTime(),
		Username: username,
		Password: password,
		Date_Created: new Date()
	};
	userDao
		.findUserByUsername(username)
		.then(user => {
			if (!user) {
				return userDao.createUser(newUser);
			} else {
				res.send("Username already exists");
			}
		})
		.then(user => {
			req.session["currentUser"] = user;
			res.send(user);
		});
};

login = (req, res) => {
	user = req.body;
	userDao.findUserByCredentials(user.Username, user.Password).then(user => {
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
	res.send(req.session["currentUser"]);
};

findAllUsers = (req, res) => {
	userDao.findAllUsers().then(users => res.send(users));
};

findUserById = (req, res) => {
	var userId = req.params["uid"];
	userDao.findUserById(userId).then(user => res.send(user));
};

updateUser = (req, res) => {};

deleteUser = (req, res) => {};
