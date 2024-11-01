import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Budget.css';

//Toast Action, for Errors and 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Budget() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [budgets, setBudgets] = useState(null);
    const [budgetName, setBudgetName] = useState('');
    const [amount, setAmount] = useState('');
    const [editingBudget, setEditingBudget] = useState(null);

    //Effects list
    useEffect(() => {
        getUserId();
    }, []); // Used to get the Username from the local storage

    useEffect(() => {
        if (userId) {
            fetchBudgets();
        }
    }, [userId]); // Used to get the budgets from the array list

    //logic for retrieving the logged in username
    function getUserId() {
        const username = localStorage.getItem('username'); // Retrieve the username from localStorage
        if (!username) {
            alert("No username found. Please log in.");
            navigate("/login");
            return;
        }
        // getter and setter for the username inputted
        axios.get(`http://localhost:8000/user/getUserId?username=${username}`)
            .then(response => {
                setUserId(response.data.userId);
            })
            .catch(error => {
                console.error("Error fetching user ID:", error);
                alert("Failed to fetch user ID.");
            });
    }

    // Clear the username from localStorage
    const handleSignOut = () => {
        localStorage.removeItem('username');
        navigate("/login");
    };

    // fetching the budget from the arraylist of the certain logged in user
    const fetchBudgets = () => {
        const username = localStorage.getItem('username');
        if (!username) {
            toast.error("No username found. Please log in.");
            return;
        }

        axios.get(`http://localhost:8000/user/budgets?username=${username}`)
            .then((response) => {
                console.log("Fetched budgets:", response.data);

                if (Array.isArray(response.data)) {
                    setBudgets(response.data);
                    toast.success("Budgets loaded successfully!");
                } else {
                    toast.error("Failed to load budgets!");
                    setBudgets([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching budgets:", error.message || error);
                toast.error("Failed to fetch budgets.");
                setBudgets(null);
            });
    };

    // logic for adding budget to the database and for the user
    const addBudget = () => {
        if (!budgetName || !amount) {
            toast.error("All fields are required.");
            return;
        }

        const budgetEntry = { userId, budgetname: budgetName, amount: Number(amount) };
        axios.post('http://localhost:8000/budget', budgetEntry)
            .then(() => {
                toast.success("Budget added successfully!");
                fetchBudgets();
                resetForm();
            })
            .catch(error => {
                console.error("Error adding budget:", error);
                toast.error("Failed to add budget.");
            });
    };

    // logic for editing a given budget to the database and for the user
    const editBudget = (budget) => {
        setEditingBudget(budget);
        setBudgetName(budget.budgetname);
        setAmount(budget.amount);
    };

    // logic for updating a given budget to the database and for the user
    const updateBudget = () => {
        if (!budgetName || !amount || !editingBudget) {
            toast.error("All fields are required.");
            return;
        }

        //handles all updates for the updating of budget 
        const updatedBudget = { userId, budgetId: editingBudget._id, budgetname: budgetName, amount: Number(amount) };
        axios.put('http://localhost:8000/budget', updatedBudget)
            .then(() => {
                toast.success("Budget updated successfully!");
                fetchBudgets();
                resetForm();
            })
            .catch(error => {
                console.error("Error updating budget:", error);
                toast.error("Failed to update budget.");
            });
    };

    // logic for deleting a given budget to the database and for the user
    const deleteBudget = (id) => {
        axios.delete('http://localhost:8000/budget', { data: { userId, budgetId: id } })
            .then(() => {
                toast.success("Budget deleted successfully!");
                fetchBudgets();
            })
            .catch(error => {
                console.error("Error deleting budget:", error);
                toast.error("Failed to delete budget.");
            });
    };

    // clears the budget enter field after usage
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

            {/* Button for adding and editing the given budget */}
            <div className="budget-container">
                <h2 id="add">{editingBudget ? "Edit Budget" : "Add a Budget"}</h2>
                <div className="budget-form">
                    <input type="text" placeholder="Budget Name" className="input-field" value={budgetName} onChange={(e) => setBudgetName(e.target.value)} />
                    <input type="number" placeholder="Amount" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} />

                    {/* what the button says during a certain logic */}
                    <div>
                        {editingBudget ? (
                            <button className="add-budget-btn" onClick={updateBudget}>Update Budget</button>
                        ) : (
                            <button className="add-budget-btn" onClick={addBudget}>Add Budget</button>
                        )}
                    </div>

                </div>
            </div>

            {/* Where the list of the budgets happen */}
            <div className="budget-list-container">
                <h2 className="_allBudgets">BUDGETS</h2>

                {budgets === null && <p>Loading budgets...</p>}

                {budgets && budgets.length > 0 ? (
                    <ul className="budget-list" id="budget-list">
                        {budgets.map(budget => (
                            <li key={budget._id} className="budget-item" id="budget-item">
                                <div id="budtit">
                                    <span id="bud-name">{budget.budgetname}</span>
                                    <div id="amounts">
                                        <span id="bud-amo">₱{budget.amount} </span>
                                        <div id="bud">Budgeted</div>
                                    </div>

                                </div>


                                <div id="ed-del">
                                    <button onClick={() => editBudget(budget)} id="edit-b">Edit</button>
                                    <button onClick={() => deleteBudget(budget._id)}  id="delete-b">Delete</button>
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : budgets && budgets.length === 0 ? (
                    <p className="Walakapabudget">No budget set</p>
                ) : (
                    // Handles budget loading failure
                    <p className="errorMessage">Failed to load budgets. Please try again.</p>
                )}
            </div>
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