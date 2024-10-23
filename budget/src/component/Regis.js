import React, { useState } from 'react'
import "./css/Regis.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Regis = () => {

  const [newUser, setnewUser] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register', newUser)
      .then(response => {
        console.log(response.data);
        setnewUser({ username: '', password: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <img src='./elements/1.png' id='logo' alt='Logo' />
      
      <div id='reg-container'>
        <div className="register-container">

          <form className="register-form">

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder='Enter a Username'
                required
                onChange={(e) => setnewUser({ ...newUser, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder='Create a Password'
                required
                onChange={(e) => setnewUser({ ...newUser, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder='Confirm Password'
                required
              />
            </div>

            <button type="submit" className="register-button" onClick={handleSubmit}>Register</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to={"/login"}>Log-in here.</Link>
          </p>
        </div>
      </div>
    </div>



  )
}

export default Regis