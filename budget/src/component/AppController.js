import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './Login'
import Regis from './Regis'




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