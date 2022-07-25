const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postModel = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    post_comment: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
    post_like: {
      type: mongoose.Schema.ObjectId,
      ref: "Like",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postModel);
