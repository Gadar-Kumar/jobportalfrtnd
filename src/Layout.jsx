import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'

const Layout = () => {
  return (
    <div>
      <Toaster />
        <Navbar/>
        <Outlet />
       <div className='mt-1' ></div>
    </div>
  )
}

export default Layout