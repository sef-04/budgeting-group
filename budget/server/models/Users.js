const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    budgetno:[]
});

const UserModel = mongoose.model("register", UserSchema);

module.exports = UserModel;