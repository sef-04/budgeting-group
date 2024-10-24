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
      <img src='./elements/1.png' id='logo' alt='Logo' />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder='Enter Username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" id='button'>Login</button>
        </form>
        <p id='link'>
          Don't have an account? <Link to={"/register"}>Register here.</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;