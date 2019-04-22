const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		_id: { type: Number, required: true },
		username: { type: String, required: true },
		dateCreated: { type: Date, required: true },
		password: { type: String, required: true },
		firstName: { type: String, required: false },
		lastName: { type: String, required: false },
		role: { type: String, required: false },
		phone: { type: String, required: false },
		email: { type: String, required: false },
		aboutMe: { type: String, required: false },
		comments: [
			{
				type: mongoose.Schema.Types.Number,
				ref: "CommentModel",
				required: false
			}
		],
		recipes: [
			{
				type: mongoose.Schema.Types.Number,
				ref: "RecipeModel",
				required: false
			}
		],
		follows: [
			{
				type: mongoose.Schema.Types.Number,
				ref: "UserModel",
				required: false
			}
		]
	},
	{ collection: "users" }
);
module.exports = userSchema;
