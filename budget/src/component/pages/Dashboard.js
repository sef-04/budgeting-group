import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import '../css/Dashboard.css';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [hasBudget, setHasBudget] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('username'); // Clears the username entered
        navigate("/login");
    };

    // Fetch user data on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Get saved Username from Login frame and enter it as Login Information
        if (storedUsername) {
            setUsername(storedUsername); // Sets Username from localStorage to Dashboard
            
            const budget = localStorage.getItem('budget'); // Checker if data is inputted in budget
            setHasBudget(!!budget);
        } else {
            navigate("/login"); // Redirect to Login if User is not Found
        }
    }, [navigate]);

    const handleCreateBudget = () => {
        navigate("/budget"); // Goes to Budget Frame
    };

    return (
        <div id="navBar-dash">
            <header>
                <img src='./elements/2.png' id='logo' alt='Logo' />
                <nav className="nav">
                    <ul>
                        <li><CustomLink to="/dashboard">Dashboard</CustomLink></li>
                        <li><CustomLink to="/budget">Budget</CustomLink></li>
                        <li><CustomLink to="/expense">Expense</CustomLink></li>
                    </ul>
                </nav>
                <button id="sign" onClick={handleSignOut}>Signout</button>
            </header>
            <div>
                <h1>{username}'s Dashboard</h1>
                {!hasBudget && (
                    <div className="budget-message">
                        <p>You have no Active budget, yet!</p>
                        <button onClick={handleCreateBudget}>- Create One Here -</button>
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