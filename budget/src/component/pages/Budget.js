import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import React from 'react'
import '../css/Budget.css';

export default function Budget() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate("/login");
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
                <h2 id="add">Add a Budget</h2>
                <div className="budget-form">
                    <input type="text" placeholder="Expense Name" className="input-field" />
                    <input type="number" placeholder="Amount" className="input-field" />
                    <div>
                        <button className="add-budget-btn">Add Budget</button>
                    </div>
                </div>


            </div>
            <h3 className="budget-list-title">Budgets</h3>
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
