const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema(
	{
		_id: { type: Number, required: true },
		description: { type: String, required: false },
		name: { type: String, required: true },
		dateCreated: { type: Date, required: true },
		moderatorId: {
			type: mongoose.Schema.Types.Number,
			ref: "UserModel",
			required: true
		},
		ingredients: [{ type: String, required: false }],
		steps: [{ type: String, required: true }],
		hostedLargeUrl: { type: String, required: false },
		source: { type: String, required: false },
		course: { type: String, required: false },
		users: [
			{
				type: mongoose.Schema.Types.Number,
				ref: "UserModel",
				required: false
			}
		]
	},
	{ collection: "recipes" }
);
module.exports = recipeSchema;
