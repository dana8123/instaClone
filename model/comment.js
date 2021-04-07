const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
  },

  createAt: {
    type: String,
  },

  insta_Id: {
    type: String,
  },

  profile_img: {
    type: String,
  },

  comment_Id: {
    type: Number,
  }
});

module.exports = mongoose.model("Comment", commentSchema);