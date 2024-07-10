import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../page/Home'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route element={<Home/>} path='/'/>
        </Routes>
    </Router>
  )
}

export default Routing