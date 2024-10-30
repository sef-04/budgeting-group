//userRoutes
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const UserModel = require("../models/Users");

//Routes for Login and Register
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

//Routes for Budget.js
    router.post("/budget", userController.createBudget); // Create a new budget
    router.put("/budget", userController.updateBudget); // Update an existing budget
    router.delete("/budget", userController.deleteBudget); // Delete a budget
    // Checks who is the current logged in User
    router.get('/user/getUserId', (req, res) => {
        const { username } = req.query;
        UserModel.findOne({ username }) // Ensure this query matches your database field names
            .then(user => {
                if (user) {
                    res.json({ userId: user._id });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
    // Fetch all budgets for a specific user by username
    router.get('/user/budgets', (req, res) => {
        const { username } = req.query;

        UserModel.findOne({ username }) // Find user by username instead of userid
            .then(user => {
                if (user) {
                    res.json(user.budgetno); // gets the created userBudgets from budgetno array inside of database
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });

module.exports = router;