const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
  },

  createAt: {
    type: String,
  },

  name: {
    type: String,
  },


});

module.exports = mongoose.model("Comment", commentSchema);