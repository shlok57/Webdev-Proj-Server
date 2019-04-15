const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
module.exports = mongoose.model('CommentModel', commentSchema);
