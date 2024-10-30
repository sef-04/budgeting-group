//User Controller
const UserModel = require("../models/Users");

// Register a new user
    const registerUser = (req, res) => {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password) {
            return res.json("Username and password are required.");
        }

        if (password !== confirmPassword) {
            return res.json("Passwords do not match!");
        }

        UserModel.findOne({ username })
            .then(existingUser => {
                if (existingUser) {
                    return res.json("Username already in use.");
                }

                const newUser = new UserModel({ username, password });
                newUser.save()
                    .then(user => res.json(user))
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    };

// Login an existing user
    const loginUser = (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json("Username and password are required.");
        }

        UserModel.findOne({ username })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        res.json("Login Successful");
                    } else {
                        res.json("The password is incorrect");
                    }
                } else {
                    res.json("User does not exist, Register first.");
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    };

// Create a new budget for a user
    const createBudget = (req, res) => {
        const { userId, budgetname, amount } = req.body;

        UserModel.findByIdAndUpdate(
            userId,
            { $push: { budgetno: { budgetname, amount } } },
            { new: true }
        )
        .then(user => res.json(user))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };

// Updates an existing budget for a user
    const updateBudget = (req, res) => {
        const { userId, budgetId, budgetname, amount } = req.body;

        UserModel.findOneAndUpdate(
            { _id: userId, "budgetno._id": budgetId },
            { $set: { "budgetno.$.budgetname": budgetname, "budgetno.$.amount": amount } },
            { new: true }
        )
        .then(user => res.json(user))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };

// Delete a budget from a user's list
    const deleteBudget = (req, res) => {
        const { userId, budgetId } = req.body;

        UserModel.findByIdAndUpdate(
            userId,
            { $pull: { budgetno: { _id: budgetId } } },
            { new: true }
        )
        .then(user => res.json(user))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };

// Exporting the controller functions
module.exports = { registerUser, loginUser, createBudget, updateBudget, deleteBudget };