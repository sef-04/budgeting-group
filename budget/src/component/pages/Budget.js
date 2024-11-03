import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Budget.css';
import Swal from 'sweetalert2'

// Toast Action for Errors and Success
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Budget() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [budgets, setBudgets] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [budgetName, setBudgetName] = useState('');
    const [amount, setAmount] = useState('');
    const [editingBudget, setEditingBudget] = useState(null);
    const [budgetsLoaded, setBudgetsLoaded] = useState(false); // New state for tracking budgets loaded

    // Effects list
    useEffect(() => {
        getUserId();
    }); // Used to get the Username from the local storage
    useEffect(() => {
        if (userId) {
            fetchBudgets();
            fetchExpenses();
        }
    }, [userId]); // Used to get the budgets and expenses table from MongoDB 

    // logic for retrieving the logged in username
    function getUserId() {
        const username = localStorage.getItem('username');
        if (!username) {
            alert("No username found. Please log in.");
            navigate("/login");
            return;
        }
        // getter and setter for the username inputted
        axios.get(`http://localhost:8000/user/getUserId?username=${username}`)
            .then(response => setUserId(response.data.userId))
            .catch(error => {
                console.error("Error getting user ID:", error);
                alert("Failed to get user ID.");
            });
    }

    // Clear the username from localStorage, signs out the current user
    const handleSignOut = () => {
        localStorage.removeItem('username');
        navigate("/login");
    };

    // Getting Budgets for every action (create, update and delete)
    const fetchBudgets = () => {
        const username = localStorage.getItem('username');
        if (!username) {
            toast.error("No username found. Please log in.");
            return;
        }

        axios.get(`http://localhost:8000/user/budgets?username=${username}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBudgets(response.data);
                    if (response.data.length > 0) { // IF Budgets exists
                        toast.success("Budgets loaded successfully!");
                        setBudgetsLoaded(true); //Budgets have been loaded
                    } else {
                        toast.info("No budgets found. Create a budget!"); //IF Budgets DO NOT exist
                    }
                } else {
                    toast.error("Failed to load budgets!");
                    setBudgets([]);
                }
            })
            .catch(error => {
                console.error("Error getting budgets:", error);
                toast.error("Failed to get budgets.");
                setBudgets(null);
            });
    };

    // getting the expenses from the arraylist of the certain logged in user
    const fetchExpenses = () => {
        const username = localStorage.getItem('username');
        axios.get(`http://localhost:8000/user/expenses?username=${username}`)
            .then(response => setExpenses(response.data))
            .catch(error => {
                console.error("Error getting expenses:", error);
                toast.error("Failed to get expenses.");
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

        //validation if to update
        Swal.fire({
            title: "Are you sure you want to update this budget?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to update it."
        }).then((result) => {
            if (result.isConfirmed) {
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
            }

            else{
                resetForm();
            }
        });


    };

    // logic for deleting a given budget to the database and for the user
    const deleteBudget = (id) => {
        //Action that pertains to another validation, ARE YOU SURE?    
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
                axios.delete('http://localhost:8000/budget', { data: { userId, budgetId: id } })
                    .then(() => {
                        toast.success("Budget and associated expenses deleted successfully!");
                        fetchBudgets(); // Refresh budgets after deletion
                    })
                    .catch(error => {
                        console.error("Error deleting budget:", error);
                        toast.error("Failed to delete budget.");
                    });
            }
        });
    };

    // clears the budget enter field after usage
    const resetForm = () => {
        setEditingBudget(null);
        setBudgetName('');
        setAmount('');
    };

    // logic for calculating the expenses added by the user in Expense.js
    const calculateTotalExpense = (budgetName) => {
        return expenses
            .filter(expense => expense.budget === budgetName)
            .reduce((total, expense) => total + expense.amount, 0);
    };

    // Frontend Data/Layout and confirmations
    return (
        <div id="b-container">
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
                        {budgets.map(budget => {
                            const totalExpense = calculateTotalExpense(budget.budgetname);
                            const percentageUsed = (totalExpense / budget.amount) * 100;

                            return (
                                <li key={budget._id} className="budget-item" id="budget-item">
                                    <div id="budtit">
                                        <span id="bud-name">{budget.budgetname}</span>
                                        <div id="amounts">
                                            <span id="bud-amo">₱{budget.amount}</span>
                                            <div id="bud">Budgeted</div>
                                        </div>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div
                                            className={`progress-bar ${percentageUsed > 100 ? "over-budget" : "below-budget"}`}
                                            style={{ width: `${percentageUsed}%` }}
                                        />
                                    </div>
                                    <span className="outof"> <p id="tot">₱{totalExpense}</p> <p>spent out of</p> <p id="amm">₱{budget.amount}</p></span>
                                    
                                    <div id="ed-del">
                                        <span id="overtxt">
                                        {percentageUsed >= 100 && (
                                        <p className="totalreached">Budget total reached!</p>
                                        )}
                                        </span>

                                        <span id="eddelbut">
                                        <button onClick={() => editBudget(budget)} id="edit-b">Edit</button>
                                        <button onClick={() => deleteBudget(budget._id)} id="delete-b">Delete</button>

                                        </span>
                                    
                                        
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : budgets && budgets.length === 0 ? (
                    <p className="Walakapabudget">No budget set</p>
                ) : (
                    <p className="errorMessage">Failed to load budgets. Please try again.</p>
                )}
            </div>
            <ToastContainer /> {/* used to show the errors and succession */}
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