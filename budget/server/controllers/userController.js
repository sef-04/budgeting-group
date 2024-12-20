//User Controller
const UserModel = require("../models/Users");

//Register.js
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

//Login.js
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

//Budget.js
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
    
        // First, find the budget and get its name
        UserModel.findOne({ _id: userId, "budgetno._id": budgetId })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: "Budget not found" });
                }
    
                const budgetName = user.budgetno.id(budgetId).budgetname;
    
                // Now, remove the budget and all associated expenses
                return UserModel.findByIdAndUpdate(
                    userId,
                    { 
                        $pull: { 
                            budgetno: { _id: budgetId },
                            expenses: { budget: budgetName } // Remove all expenses associated with the deleted budget
                        } 
                    },
                    { new: true }
                );
            })
            .then(user => res.json(user))
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    };

//Expense.js
    // Add an expense 
    const addExpense = (req, res) => {
        const { username, expenseName, amount, budget } = req.body;
        const expense = {
            expenseName,
            amount,
            budget,
            date: new Date()
        };

        UserModel.findOneAndUpdate(
            { username },
            { $push: { expenses: expense } },
            { new: true }
        )
        .then(user => res.json(expense))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };
    // Fetch expenses
    const getExpenses = (req, res) => {
        const { username } = req.query;

        UserModel.findOne({ username }, 'expenses')
            .then(user => {
                if (!user) return res.status(404).json({ error: "User not found" });
                res.json(user.expenses);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    };

    // Update an existing expense
    const updateExpense = (req, res) => {
        const { username, expenseId, expenseName, amount, budget } = req.body;

        UserModel.findOneAndUpdate(
            { username, "expenses._id": expenseId },
            { $set: { "expenses.$.expenseName": expenseName, "expenses.$.amount": amount, "expenses.$.budget": budget, "expenses.$.date": new Date() } },
            { new: true }
        )
        .then(user => {
            if (user) {
                res.json(user.expenses);
            } else {
                res.status(404).json({ error: "Expense not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };

    // Delete an expense
    const deleteExpense = (req, res) => {
        const { username, expenseId } = req.body;

        UserModel.findOneAndUpdate(
            { username },
            { $pull: { expenses: { _id: expenseId } } },
            { new: true }
        )
        .then(user => {
            if (user) {
                res.json(user.expenses);
            } else {
                res.status(404).json({ error: "Expense not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    };

module.exports = { registerUser , loginUser , createBudget, updateBudget, deleteBudget, addExpense, getExpenses, updateExpense, deleteExpense };