const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    budgetno:[
        {
            budgetname: String,
            amount: Number
        }
    ]
});

const UserModel = mongoose.model("register", UserSchema);

module.exports = UserModel;