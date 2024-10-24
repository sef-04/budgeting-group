import React from "react"
import { Link, useMatch, useResolvedPath, useNavigate} from "react-router-dom";
import '../css/Expense.css'; 

export default function Expense() {
    const navigate = useNavigate();

    const handleSignOut = () => { 
        navigate("/login"); 
    };
    return (
        <div id="navBar-ex">
            <img src='./elements/2.png' id='logo' alt='Logo' />
            <nav className="nav">
                <ul className="menu">
                    <CustomLink to="/dashboard">Dashboard</CustomLink>
                    <CustomLink to="/budget">Budget</CustomLink>
                    <CustomLink to="/expense">Expense</CustomLink>
                </ul>
                <button id="sign" onClick={handleSignOut}>Signout</button>
            </nav>

            <div id="expensePage">
            <h1>Expense</h1>
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
