import { Link, useNavigate } from "react-router-dom";
import '../css/Home.css';
import React from 'react';


const Home = () => {
    const navigate = useNavigate();

    const handle = () => {
        navigate("/register");
    }


    return (
        <div id="container-h">
            <div id="header">
                <header>
                    <img src='./elements/2.png' id='logo-h' alt='Logo' />
                </header>
            </div>


            <div id="allsec">
                <section className="sections">
                    <div id="top">
                        <div id="top-left">
                            <h1 id="effortless">
                                Effortless Budgeting and
                                <div id="instant">Instant Savings,</div>
                                Designed Just for You!
                            </h1>

                            <p id="desc">
                                Take control of your finances with Instant Savings,
                                the budget management tool that helps you save with ease.
                                Track your budgets, monitor expenses, and reach your financial goals.
                                Whether you're budgeting for the month or planning long-term,
                                Instant Savings is here to make every dollar count.
                            </p>

                            <button id="createacc" onClick={handle}>- Create an Account. It's Free! -</button>
                        </div>

                        <img src='./elements/home icon.png' id='budgets' alt='budgetsandexpense' />


                    </div>

                </section>

                <section className="sections">
                    <div id="middle">
                        <div id="m-left">
                            <img src='./elements/track.png' id='track' alt='magnifying glass' />
                            <h1 id="t1">Track your budgets</h1>

                            <div className="spacing">

                            </div>
                            <p id="d1">
                                Stay on top of your spending with Instant Savings'
                                intuitive budget-tracking tools! Simply add your expense categories and set a budget for each one.
                                Visual progress bars show how much you've spent, helping you manage finances at a glance. Whether you're saving for
                                essentials or setting aside funds for fun, Instant Savings makes it easy to see where your money is going and stay within your limits.
                                Take control of your finances and start building healthy spending habits today!
                            </p>
                        </div>

                        <div id="m-right">
                            <img src='./elements/money.png' id='money' alt='magnifying glass' />
                            <h1 id="t2">Manage your expeses</h1>
                            <p id="d2">
                                Easily log and categorize your spending with Instant Savings' expense management tool. Just enter your expense details,
                                select the budget it belongs to, and keep track of where every dollar goes. With a clear and organized overview of recent expenses,
                                you can monitor spending patterns, avoid overspending, and make informed adjustments to stay on track.
                                Empower yourself to reach your financial goals by managing your expenses more effectively!
                            </p>
                        </div>
                    </div>
                </section>

                <section className="sections">
                    <div id="bottom">
                        <div id="b-top">
                            <h1 id="about">about <span id="red">Instant Savings</span></h1>
                            <div id="abt-desc">
                                <p>At Instant Savings, we're passionate about helping you take control of your finances with ease and simplicity.
                                    We believe budgeting shouldn't be complicated or time-consuming,
                                    and that's why we've designed a tool that makes managing your money straightforward, efficient, and even enjoyable.</p>

                            </div>
                        </div>

                        <div id="b-bot">
                            <div id="b-left">
                                <h1 id="mission-t">Our Mission</h1>
                                <p id="mission">Our mission is to empower individuals and families to build better financial habits through clear, accessible budgeting tools.
                                    We aim to give you everything you need to budget wisely, track expenses, and save more - all in one place.</p>
                            </div>

                            <div id="b-right">
                                <h1 id="vision-t">Our Vision</h1>
                                <p id="vision">We envision a world where everyone feels confident about their financial future. With Instant Savings,
                                    we're working towards a society where people can take control of their finances, reach their goals, and enjoy peace of mind.</p>

                            </div>


                        </div>


                    </div>
                </section>

                <footer id="footer">
                    <img src='./elements/1.png' id='logo-h' alt='Logo' />
                    <div id="footer-r">
                        <div className="follow">
                            <ul className="list">
                                <p className="tt">Follow us:</p>
                                <li ><a href="https://www.facebook.com/" className="follow">Facebook</a></li>
                                <li ><a href="https://www.instagram.com/" className="follow">Instagram</a></li>
                            </ul>



                        </div>
                        <div className="contact">
                            <ul className="list">
                                <p className="tt">Contact us:</p>
                                <li >instantsaving@gmail.com</li>
                                <li >1-instant-saving</li>
                            </ul>

                        </div>

                    </div>
                </footer>


            </div>



        </div>
    )
}

export default Home