import React from 'react'
import "./css/Regis.css"
import { Link } from 'react-router-dom'


const Regis = () => {
  return (
    <div id='reg-container'>
       <div className="register-container">
      <form  className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder='Enter a Username'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder='Create a Password'
            required
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
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to={"/login"}>Log-in here.</Link>
      </p>
    </div>
    </div>
   
  )
}

export default Regis