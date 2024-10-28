import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Budget.css';

export default function Budget() {
    const navigate = useNavigate();

    const [budgets, setBudgets] = useState([]);
    const [budgetName, setBudgetName] = useState('');
    const [amount, setAmount] = useState('');
    const [editingBudget, setEditingBudget] = useState(null);

    // Replace with actual logged-in user ID (or retrieve from context/store)
    const userId = "YOUR_USER_ID";

    const handleSignOut = () => {
        navigate("/login");
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = () => {
        axios.get(`http://localhost:8000/user/${userId}/budgets`)
            .then(response => setBudgets(response.data.budgetno))
            .catch(error => {
                console.error("Error fetching budgets:", error);
                alert("Failed to fetch budgets.");
            });
    };

    const addBudget = () => {
        if (!budgetName || !amount) {
            return alert("All fields are required.");
        }

        const budgetEntry = { userId, budgetname: budgetName, amount: Number(amount) };
        axios.post('http://localhost:8000/budget', budgetEntry)
            .then(() => {
                fetchBudgets();
                resetForm();
            })
            .catch(error => {
                console.error("Error adding budget:", error);
                alert("Failed to add budget.");
            });
    };

    const editBudget = (budget) => {
        setEditingBudget(budget);
        setBudgetName(budget.budgetname);
        setAmount(budget.amount);
    };

    const updateBudget = () => {
        if (!budgetName || !amount || !editingBudget) {
            return alert("All fields are required.");
        }

        const updatedBudget = { userId, budgetId: editingBudget._id, budgetname: budgetName, amount: Number(amount) };
        axios.put('http://localhost:8000/budget/update', updatedBudget)
            .then(() => {
                fetchBudgets();
                resetForm();
            })
            .catch(error => {
                console.error("Error updating budget:", error);
                alert("Failed to update budget.");
            });
    };

    const deleteBudget = (id) => {
        axios.delete('http://localhost:8000/budget/delete', { data: { userId, budgetId: id } })
            .then(() => fetchBudgets())
            .catch(error => {
                console.error("Error deleting budget:", error);
                alert("Failed to delete budget.");
            });
    };

    const resetForm = () => {
        setEditingBudget(null);
        setBudgetName('');
        setAmount('');
    };

    return (
        <div id="navBar-bud">
            <header>
                <img src='./elements/2.png' id='logo' alt='Logo' />
                <nav className="nav">
                    <ul>
                        <CustomLink to="/dashboard">Dashboard</CustomLink>
                        <CustomLink to="/budget">Budget</CustomLink>
                        <CustomLink to="/expense">Expense</CustomLink>
                    </ul>
                </nav>
                <button id="sign" onClick={handleSignOut}>Signout</button>
            </header>

            <div className="budget-container">
                <h2 id="add">{editingBudget ? "Edit Budget" : "Add a Budget"}</h2>
                <div className="budget-form">
                    <input 
                        type="text" 
                        placeholder="Budget Name" 
                        className="input-field" 
                        value={budgetName}
                        onChange={(e) => setBudgetName(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        className="input-field" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div>
                        {editingBudget ? (
                            <button className="add-budget-btn" onClick={updateBudget}>Update Budget</button>
                        ) : (
                            <button className="add-budget-btn" onClick={addBudget}>Add Budget</button>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="_allBudgets">BUDGETS</h2>
                {budgets.length > 0 ? (
                    <ul>
                        {budgets.map(budget => (
                            <li key={budget._id}>
                                {budget.budgetname}: ${budget.amount}
                                <button onClick={() => editBudget(budget)}>Edit</button>
                                <button onClick={() => deleteBudget(budget._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="Walakapabudget">No budget set</p>
                )}
            </div>
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
