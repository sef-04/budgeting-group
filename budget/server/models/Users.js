const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    budgetno: [
        {
            budgetname: String,
            amount: Number
        }
    ],
    expenses: [
        {
            expenseName: String,
            amount: Number,
            budget: String,
            date: { type: Date, default: Date.now }
        }
    ]
});


const UserModel = mongoose.model("register", UserSchema);

module.exports = UserModel;