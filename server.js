var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    useNewUrlParser: true
}));
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

require('./data/db')();
require('./services/recipe.service.server')(app);
require('./services/comment.service.server')(app);



//app.listen(process.env.PORT || 8080);

app.listen(8080);


