const mongoose = require("mongoose");

const { Schema } = mongoose;
const postSchema = new Schema({
  file: {
    type: String,
  },
  createAt: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
})

module.exports = mongoose.model("Post", postSchema)