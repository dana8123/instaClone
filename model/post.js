const mongoose = require("mongoose");

const { Schema } = mongoose;
const postSchema = new Schema({
  post_Id: {
    type: Number,
  },

  file_name: {
    type: Array,
  },

  createAt: {
    type: String,
  },

  name: {
    type: String,
    required: true
  },

  insta_Id: {
    type: String,
  },

  content: {
    type: String,
  },

  like_user: {
    type: Array,
  },

  like_count: {
    type: Number,
  },

  profile_img: {
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