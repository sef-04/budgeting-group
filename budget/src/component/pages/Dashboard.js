import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import '../css/Dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const handleSignOut = () => {
        localStorage.removeItem('username'); // Clears the username entered
        navigate("/login");
    };

    // Fetch user data and budgets on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Get saved Username from Login frame
        if (storedUsername) {
            setUsername(storedUsername); // Set Username from localStorage to Dashboard
            fetchBudgets(storedUsername); // Fetch budgets from API
            fetchExpenses(storedUsername);
        } else {
            navigate("/login"); // Redirect to Login if User is not Found
        }
    }, [navigate]);

    const fetchBudgets = (username) => {
        axios.get(`http://localhost:8000/user/budgets?username=${username}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBudgets(response.data); // Update state with fetched budgets
                } else {
                    console.error("Failed to fetch budgets");
                }
            })
            .catch(error => {
                console.error("Error fetching budgets:", error);
            });
    };

    // getting the expenses from the arraylist of the certain logged in user
    const fetchExpenses = () => {
        const username = localStorage.getItem('username');
        axios.get(`http://localhost:8000/user/expenses?username=${username}`)
            .then(response => setExpenses(response.data))
            .catch(error => {
                console.error("Error getting expenses:", error);
                alert("Failed to get expenses.");
            });
    };

    const calculateTotalExpense = (budgetName) => {
        return expenses
            .filter(expense => expense.budget === budgetName)
            .reduce((total, expense) => total + expense.amount, 0);
    };

    const handleCreateBudget = () => {
        navigate("/budget"); // Goes to Budget Frame
    };

    return (
        <div id="navBar-dash">
            <header>
                <img src='./elements/2.png' id='logo' alt='Logo' />
                <nav className="nav">
                    <ul>
                        <CustomLink to="/dashboard">Dashboard</CustomLink>
                        <CustomLink to="/budget">Budget</CustomLink>
                        <CustomLink to="/expense">Expense</CustomLink>
                    </ul>
                </nav>
                <button id="sign" onClick={handleSignOut}>Sign Out</button>
            </header>
            <div>
                <h1 id="dashname"><span className="username">{username}'s</span> Dashboard</h1>
                {budgets.length === 0 ? (
                    <div className="budget-message">
                        <p>You have no active budget, yet!</p>
                        <button onClick={handleCreateBudget}>Create One Here</button>
                    </div>
                ) : (
                    <div>
                        <h2>Your Budgets</h2>
                        <ul id="budget-list">
                            {budgets.map(budget => {
                                const totalExpense = calculateTotalExpense(budget.budgetname);
                                const percentageUsed = (totalExpense / budget.amount) * 100;

                                return (
                                    <li id="budget-item" key={budget._id}>
                                        <span id="bud-name">{budget.budgetname}: ₱{budget.amount}</span>
                                        <div className="progress-bar-container">
                                            <div
                                                className={`progress-bar ${percentageUsed > 100 ? "over-budget" : "below-budget"}`}
                                                style={{ width: `${percentageUsed}%` }}
                                            />
                                        </div>
                                        <p className="outof">{`₱${totalExpense} spent out of ₱${budget.amount}`}</p>
                                        {percentageUsed >= 100 && (
                                            <p className="totalreached">Budget total reached!</p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

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