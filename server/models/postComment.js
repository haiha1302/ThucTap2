const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentModel = new Schema(
  {
    post_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentModel);
