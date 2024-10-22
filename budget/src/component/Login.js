import React, { useState } from 'react'
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login', { username, password })
      .then(response => {
        if (response.data === "Login Successful") {
          navigate('/dashboard')
        }

      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <div>
      <img src='./elements/1.png' id='logo'></img>
      <div className="login-container">


        <form>
          <label htmlFor="username" >Username</label>
          <input
            type="text"
            id="username"
            placeholder='Enter Username'
            required
            onChange={(e) => setusername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password'
            required
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="submit" id='button' onClick={handleSubmit}>Login</button>

        </form>
        <p id='link'>
          Don't have an account? <Link to={"/register"}>Register here.</Link>
        </p>
      </div>
    </div>



  )
}

export default Login