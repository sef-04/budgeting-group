import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import '../css/Dashboard.css';
import React from 'react';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate("/login");
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
                <button id="sign" onClick={handleSignOut}>Signout</button>
            </header>
            <div>
                <h1>Dashboard</h1>
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