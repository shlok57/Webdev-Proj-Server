var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var session = require("express-session");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
		useNewUrlParser: true
	})
);
app.get("/hello", function(req, res) {
	res.send("hello world");
});

app.use(function(req, res, next) {
	if(process.env.FRONT_END_URL)
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	else
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "TopSecretShit"
	})
);

require("./data/db")();
require("./services/recipe.service.server")(app);
require("./services/comment.service.server")(app);
require("./services/user.service.server")(app);

app.listen(process.env.PORT || 8080);

// app.listen(3000);
