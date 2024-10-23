import React from 'react';
import './css/Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            {/* // Dashboard */}
            <section id='dashboard'>
                <nav id='dash-nav'>
                    <img src='./elements/2.png' id='logo' alt='Logo' />
                    <div>
                        <ul className='menu'>
                            <li><a href='#dashboard'>DASHBOARD</a></li>
                            <li><a href='#budget'>BUDGET</a></li>
                            <li><a href='#expense'>EXPENSE</a></li>
                        </ul>
                    </div>
                </nav>
            </section>

            {/* //Budget */}
            <section id='budget'>
                <div className='b-container'>
                        

                </div>
            </section>
        </div>

    );
};

export default Dashboard;
