// UserRoute
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// User registration and login routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Budget routes
router.post("/budget", userController.createBudget);
router.put("/budget/update", userController.updateBudget);
router.delete("/budget/delete", userController.deleteBudget);

module.exports = router;
