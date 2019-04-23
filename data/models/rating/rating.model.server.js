var mongoose = require('mongoose');
var ratingSchema = require('./rating.schema.server');
module.exports = mongoose.model('RatingModel', ratingSchema);

