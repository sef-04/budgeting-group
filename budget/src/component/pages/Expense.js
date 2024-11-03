import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Expense.css";

// Toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function Expense() {
    const navigate = useNavigate();
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    // Getting both Budgets and Expenses for every action (create, update and delete)
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("No username found. Please log in.");
            navigate("/login");
            return;
        }

        // Get Budgets
        axios.get(`http://localhost:8000/user/budgets?username=${username}`)
            .then(response => {
                setBudgets(response.data);
            })
            .catch(error => {
                console.error("Error loading budgets:", error);
                toast.error("Failed to load budgets.");
            });

        // Get Expenses
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

        // Calculate the new total expense after the update
        const newTotalExpense = editingExpense
            ? totalExpenseForBudget - editingExpense.amount + Number(amount)
            : totalExpenseForBudget + Number(amount);

        // Check if the new total expense exceeds the budget
        if (newTotalExpense > budgetAmount) {
            toast.error("Expense amount exceeds the available budget for this category.");
            return false;
        }
        return true;
    };

    // Handle adding or updating an expense
    const handleExpenseSubmit = () => {
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

        if (editingExpense) {
            // Update existing expense
            expenseData.expenseId = editingExpense._id;
            //validation if to update
        Swal.fire({
            title: "Are you sure you want to update this expense?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to update it."
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put("http://localhost:8000/expense", expenseData)
                .then(response => {
                    setExpenses(response.data); // Update local state with new expenses
                    toast.success("Expense updated successfully!");
                    resetForm();
                })
                .catch(error => {
                    console.error("Error updating expense:", error);
                    toast.error("Failed to update expense.");
                });
            }

            else{
                resetForm();
            }
        });


            
        } else {
            // Add new expense
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
        }
    };

    // Reset form fields
    const resetForm = () => {
        setExpenseName("");
        setAmount("");
        setSelectedBudget("");
        setEditingExpense(null);
    };

    // Handle editing an expense
    const editExpense = (expense) => {
        setEditingExpense(expense);
        setExpenseName(expense.expenseName);
        setAmount(expense.amount);
        setSelectedBudget(expense.budget);
    };

    // Handle deleting an expense
    const deleteExpense = (id) => {
        const username = localStorage.getItem("username");
        Swal.fire({
            title: "Are you sure you want to delete this budget?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#de0337",
            cancelButtonColor: "#1f1408",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8000/expense', { data: { username, expenseId: id } })
                .then(() => {
                    toast.success("Expense deleted successfully!");
                    fetchExpenses(); // Refresh expenses after deletion
                })
                .catch(error => {
                    console.error("Error deleting expense:", error);
                    toast.error("Failed to delete expense.");
                });
                
            }
        });

       
    };

    // Getting Expenses for every action (create,update and delete)
    const fetchExpenses = () => {
        const username = localStorage.getItem("username");
        
        axios.get(`http://localhost:8000/user/expenses?username=${username}`)
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error("Error getting expenses:", error);
                toast.error("Failed to load expenses.");
            });
    };

    // Frontend Data/Layout and confirmations
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
                <button id="add-expense" onClick={handleExpenseSubmit}>{editingExpense ? "Update Expense" : "Add Expense"}</button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.expenseName}</td>
                                <td>{expense.amount}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.budget}</td>
                                <td>
                                    <button onClick={() => editExpense(expense)} id="editex">Edit</button>
                                    <button onClick={() => deleteExpense(expense._id)} id="delex">Delete</button>
                                </td>
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