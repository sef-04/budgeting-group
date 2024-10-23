import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Regis from './Regis'
import Login from './Login'
import Dashboard from './Dashboard';




const AppController = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Regis/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppController