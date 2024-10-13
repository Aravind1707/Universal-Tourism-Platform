// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  travelPreferences: {
    destination: String,
    modeOfTransport: String,
    accommodationType: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;