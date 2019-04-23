module.exports = app => {
	app.post('/api/user', createUser);
	app.post('/api/admin/user', createUserByAdmin);
	app.put('/api/admin/user/:userId', updateUserByAdmin);
	app.get('/api/profile', profile);
	app.get('/api/user', findAllUsers);
	app.get('/api/profile/:username', getProfileOfUser);
	app.post('/api/logout', logout);
	app.post('/api/login', login);
	app.put('/api/profile', updateProfile);
	app.delete('/api/user/:userId', deleteUser);

	var userDao = require('../data/daos/user.dao.server');
	var likeDao = require('../data/daos/like.dao.server');
	var ratingDao = require('../data/daos/rating.dao.server');
	var followDao = require('../data/daos/follow.dao.server');

	profile = (req, res) =>  {
		var user = req.session["currentUser"];
		if (user) {
			var userId = user["_id"];
			userDao.findUserById(userId).then(user => res.send(user));
		} else {
			res.send({ msg: "No Logged In User" });
		}
	}

	login = (req, res) =>  {
		var credentials = req.body;
		userDao
			.findUserByCredentials(credentials)
			.then(user => {
				if(user !== null) {
				req.session['currentUser'] = user;
				res.json(user);
			} else {
				res.json({});
			}
		})
	}

	getProfileOfUser = (req, res) =>  {
		var username = req.params['username'];
		userDao
			.findUserByUsername(username)
			.then(users => res.json(users[0]));
	}

	logout = (req, res) =>  {
		req.session.destroy();
		res.sendStatus(200);
	}

	updateProfile = (req, res) =>  {
		var currentUser = req.session['currentUser'];
		var userId = currentUser['_id'];
		var newUser = req.body;

		userDao
			.updateUser(userId, newUser)
			.then(status => {
			req.session['currentUser'] = newUser;
		res.send(status)
	});
	}

	updateUserByAdmin = (req, res) =>  {
		var userId = req.params['userId'];
		var newUser = req.body;
		userDao
			.updateUser(userId, newUser)
			.then(status => {
			res.send(status)
		});
	}

	findAllUsers = (req, res) =>  {
		userDao.findAllUsers()
			.then(users => res.json(users));
	}

	createUser = (req, res) =>  {
		var user = req.body;
		userDao.findUserByUsername(user.username)
			.then((users) => {
			if (users.length === 0) {
			userDao.createUser(user)
				.then(user => {
				req.session['currentUser'] = user;
			res.send(user)
		});
		} else res.send({})
	});
	}

	createUserByAdmin = (req, res) =>  {
		var user = req.body;
		userDao.findUserByUsername(user.username)
			.then((users) => {
			if (users.length === 0) {
			userDao.createUser(user)
				.then(user => {
				res.send(user)
			});
		} else res.send({})
	});
	}

	deleteUser = (req, res) =>  {
		var userId = req.params['userId'];
		likeDao.deleteLikesForUser(userId)
			.then(() => ratingDao.deleteRatingsForUser(userId))
	.then(() => followDao.deleteFollowingsForUser(userId))
	.then(() => followDao.deleteFollowersForUser(userId))
	.then(() => userDao.deleteUser(userId))
	.then(response => res.send(response));
	}
}
