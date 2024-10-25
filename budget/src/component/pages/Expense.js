import React from "react"
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import '../css/Expense.css';

export default function Expense() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate("/login");
    };
    return (
        <div id="navBar-ex">
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

            <section className="add-expense">
                <h2 id="add">Add a Expense</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Expense Name"
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="input-field"

                    />
                    <select className="input-field" placeholder="Pick a Budget">
                        <option value="Pick the Budget" id="pick" disabled>Pick the Budget</option>

                    </select>

                </div>
                <button id="add-expense">Add Expense</button>
            </section>

            <section className="recent-expense">
                <h2 id="expense-list-title">Recent Expense</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Budget</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </section>
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
