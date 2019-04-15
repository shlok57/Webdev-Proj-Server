module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'whiteboard-sp19-project';
    //var connectionString = process.env.MONGODB_URI;
   var connectionString = 'mongodb://localhost/';
   connectionString += databaseName;
    mongoose.connect(connectionString);
};
