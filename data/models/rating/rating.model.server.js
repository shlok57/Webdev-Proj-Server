var mongoose = require('mongoose');
var ratingSchema = require('./rating.schema.server');
var ratingModel = mongoose.model('RatingModel', ratingSchema);

