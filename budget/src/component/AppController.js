import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Regis from './Regis'
import Login from './Login'




const AppController = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Regis/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppController