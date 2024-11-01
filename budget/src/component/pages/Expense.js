import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Expense.css";

// Toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Expense() {
    const navigate = useNavigate();
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Fetch budgets and expenses on component mount
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("No username found. Please log in.");
            navigate("/login");
            return;
        }

        // Fetch budgets
        axios.get(`http://localhost:8000/user/budgets?username=${username}`)
            .then(response => {
                setBudgets(response.data);
            })
            .catch(error => {
                console.error("Error loading budgets:", error);
                toast.error("Failed to load budgets.");
            });

        // Fetch expenses
        axios.get(`http://localhost:8000/user/expenses?username=${username}`)
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error("Error getting expenses:", error);
                toast.error("Failed to load expenses.");
            });
    }, [navigate]);

    // Handle sign-out and clear user data
    const handleSignOut = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    // Validate if the expense amount is within the selected budget
    const validateExpense = () => {
        const selectedBudgetData = budgets.find(budget => budget.budgetname === selectedBudget);
        if (!selectedBudgetData) return true;

        const budgetAmount = selectedBudgetData.amount;
        const totalExpenseForBudget = expenses
            .filter(expense => expense.budget === selectedBudget)
            .reduce((acc, expense) => acc + expense.amount, 0);

        // Check if the new expense would exceed the budget
        if (Number(amount) + totalExpenseForBudget > budgetAmount) {
            toast.error("Expense amount exceeds the available budget for this category.");
            return false;
        }
        return true;
    };

    // Handle adding expense with validation
    const addExpense = () => {
        if (!expenseName || !amount || !selectedBudget) {
            toast.error("All fields are required.");
            return;
        }

        // Validate against the selected budget
        if (!validateExpense()) {
            return;
        }

        const username = localStorage.getItem("username");
        const expenseData = {
            username,
            expenseName,
            amount: Number(amount),
            budget: selectedBudget
        };

        axios.post("http://localhost:8000/expense", expenseData)
            .then(response => {
                setExpenses([...expenses, response.data]); // Update local state with new expense
                toast.success("Expense added successfully!");
                resetForm();
            })
            .catch(error => {
                console.error("Error adding expense:", error);
                toast.error("Failed to add expense.");
            });
    };

    // Reset form fields
    const resetForm = () => {
        setExpenseName("");
        setAmount("");
        setSelectedBudget("");
    };

    return (
        <div id="navBar-ex">
            <header>
                <img src="./elements/2.png" id="logo" alt="Logo" />
                <nav className="nav">
                    <ul>
                        <CustomLink to="/dashboard">Dashboard</CustomLink>
                        <CustomLink to="/budget">Budget</CustomLink>
                        <CustomLink to="/expense">Expense</CustomLink>
                    </ul>
                </nav>
                <button id="sign" onClick={handleSignOut}>Signout</button>
            </header>

            <section className="add-expense">
                <h2 id="add">Add an Expense</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Expense Name"
                        className="input-field"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="input-field"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select
                        className="input-field"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                    >
                        <option value="" disabled>Pick the Budget</option>
                        {budgets.map(budget => (
                            <option key={budget._id} value={budget.budgetname}>
                                {budget.budgetname} - Total: ₱{budget.amount}
                            </option>
                        ))}
                    </select>
                </div>
                <button id="add-expense" onClick={addExpense}>Add Expense</button>
            </section>

            <section className="recent-expense">
                <h2 id="expense-list-title">Recent Expenses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Budget Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.expenseName}</td>
                                <td>{expense.amount}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.budget}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <ToastContainer /> {/* used to show the errors and succession */}
        </div>
    );
}

// CustomLink function to handle active state styling
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}