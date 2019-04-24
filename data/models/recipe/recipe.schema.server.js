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
		yummlyId: String,
		sourceRecipeUrl: String,
		chef: {type: mongoose.Schema.Types.Number, ref: 'UserModel'}
	},
	{ collection: "recipes" }
);
recipeSchema.index({'name': 'text', 'ingredients': 'text'});

module.exports = recipeSchema;
