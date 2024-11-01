import React, { useState } from 'react';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//lib
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("All fields are required.");
      return;
    }

    axios.post('http://localhost:8000/login', { username, password })
      .then(response => {
       
        if (response.data === "User does not exist, Register first.") {
          toast.error("User does not exist, please register first.");
        } else if (response.data === "The password is incorrect") {
          toast.error("The password is incorrect.");
        } else if (response.data === "Login Successful") {
          toast.success("Login Successful!")
          localStorage.setItem('username', username); // Storage of Username entered, to be used for Dashboard
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occurred during login. Please try again.");
      });
  };

  return (
    <div>
      <div id='container'> 
      <div className="login-container">
      <img src='./elements/1.png' id='logo' alt='Logo' />
        <form onSubmit={handleSubmit} id='l-form'>
          <label htmlFor="username" id='l-user'>Username</label>
          <input
            type="text"
            id="username"
            placeholder='Enter Username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" id='l-pass'>Password</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" id='l-button'>Login</button>
        </form>
        <p id='link'>
          Don't have an account? <Link to={"/register"}>Register here.</Link>
        </p>
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
    
  );
}

export default Login;