module.exports = function() {
	const mongoose = require("mongoose");
	// const databaseName = "whiteboard-sp19-project";
	// var connectionString = process.env.MONGODB_URI;
	if (process.env.MONGO_URI === undefined) {
		var connectionString =
			"mongodb://dbadmin:dbadmin1@ds153304.mlab.com:53304/whiteboard-sp19-project";
	} else {
		var connectionString = process.env.MONGO_URI;
	}
	//var connectionString = 'mongodb://localhost/';
	// connectionString += databaseName;
	mongoose.connect(connectionString);
};
