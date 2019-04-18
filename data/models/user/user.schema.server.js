const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		_id: { type: Number, required: true },
		Username: { type: String, required: true },
		Date_Created: { type: Date, required: true },
		Password: { type: String, required: true },
		First_Name: { type: String, required: false },
		Last_Name: { type: String, required: false },
		Role: { type: String, required: false },
		Phone: { type: String, required: false },
		Email: { type: String, required: false },
		Comments: {
			type: mongoose.Schema.Types.Number,
			ref: "CommentModel",
			required: false
		}
	},
	{ collection: "users" }
);
module.exports = userSchema;
