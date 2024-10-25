import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import '../css/Dashboard.css';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleSignOut = () => {
        localStorage.removeItem('username'); // Clear username from storage
        navigate("/login");
    };

    // Fetch user data on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Get saved Login Username Information
        if (storedUsername) {
            setUsername(storedUsername); // Sets Username from localStorage to Dashboard
        } else {
            navigate("/login"); // Redirect to Login if User is not Found
        }
    }, [navigate]);

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