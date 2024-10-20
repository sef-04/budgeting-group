const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserModel = mongoose.model("register", UserSchema);

module.exports = UserModel;