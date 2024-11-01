import React, { useState } from 'react'
import "./css/Regis.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

//lib
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Regis = () => {
  const [newUser, setNewUser] = useState({ username: '', password: '', confirmPassword: '' });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!newUser.username || !newUser.password || !newUser.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }


    if (newUser.password !== newUser.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }


    axios.post('http://localhost:8000/register', newUser)
      .then(response => {
        if (response.data === "Username already in use.") {
          toast.error("Username already in use.");
        } else if (response.data === "Username and password are required.") {
          toast.error("All fields are required.");
        } else if (response.data === "Passwords do not match!") {
          toast.error("Passwords do not match!");
        } else {
          console.log(response.data);
          setNewUser({ username: '', password: '', confirmPassword: '' });
          toast.success("Registered Successfully!")
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }




      })
      .catch(error => {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <div>
      <div id="container">
      
      <div id='reg-container'>
        <img src='./elements/1.png' id='logo-r' alt='Logo' />
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" id='r-user'>Username</label>
              <input
                type="text"
                id="username"
                placeholder='Enter a Username'
                required
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" id='r-pass'>Password</label>
              <input
                type="password"
                id="password"
                placeholder='Create a Password'
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" id='r-cpass'>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder='Confirm Password'
                required
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
              />
            </div>

            <button type="submit" id="register-button">Register</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to={"/login"}>Log-in here.</Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>

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
    
  )
}

export default Regis;