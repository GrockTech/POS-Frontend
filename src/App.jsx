import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Side from './sideBar/Side'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/admin/Admin'
import Shop from './pages/shop/Shop'
import Orders from './pages/orders/Orders'
import Receipt from './pages/receipt/Receipt'
import Update from "./pages/update/Update"

// import Orders from './pages/Orders/Orders'
Orders

const Layout = () =>{
  
  return (
    <div className='app'>

      <Side/>
      <Outlet/>
      

    </div>
  )
}

const router =  createBrowserRouter([{
  path:"/",
  element:<Layout/>,
  children: [
    {
      
      path: '/',
      element: <Admin/>
    },
 
    {
      path: '/store',
      element: <Shop/>
    },
    {
      path: '/orders',
      element: <Orders/>
    },
    {
      path: '/receipt',
      element: <Receipt/>
    },
    {
      path: '/update',
      element: <Update/>
    },
  ]
},

])

function App() {
 

  return (
    <>
     <div>
     <RouterProvider router={router} />
     </div>
    </>
  )
}

export default App
