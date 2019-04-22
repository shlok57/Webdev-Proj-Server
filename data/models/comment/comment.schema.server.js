const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
	{
		_id: { type: Number, required: true },
		userId: {
			type: mongoose.Schema.Types.Number,
			ref: "UserModel",
			required: true
		},
		recipeId: {
			type: mongoose.Schema.Types.Number,
			ref: "RecipeModel",
			required: true
		},
		comment: { type: String, required: true }
	},
	{ collection: "comments" }
);
module.exports = commentSchema;
