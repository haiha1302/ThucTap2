const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: String,
  otp: String,
  username: String,
  password: String,
  dateOfBirth: String,
  time: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

module.exports = mongoose.model("OTP", otpSchema);
