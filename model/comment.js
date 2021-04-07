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
  name: {
    type: String,
  },

  profile_img: {
    type: String,
  },

  comment_Id: {
    type: Number,
  }

});

commentSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

commentSchema.set("toJSON", {
  virtuals: true,
})

module.exports = mongoose.model("Comment", commentSchema);