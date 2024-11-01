import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Regis from './Regis'
import Login from './Login'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budget'
import Expense from './pages/Expense'
import Home from './pages/Home'





const AppController = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Regis/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/budget" element={<Budget/>} />
            <Route path="/expense" element={<Expense/>} />
            <Route path="/" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppController