const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema(
	{
		_id: { type: Number, required: true },
		name: String,
		ingredients: String,
		imageUrl: String,
		totalTime: String,
		numberOfServings: Number,
		rating: Number,
		createdBy: String,
		yummlyRating: Number,
		yummlyId: Number,
		chef: {type: mongoose.Schema.Types.Number, ref: 'UserModel'}
	},
	{ collection: "recipes" }
);
module.exports = recipeSchema;
