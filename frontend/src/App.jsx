import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Admin from './Components/Admin';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: "/admin",
      element: <><Navbar /><Admin /></>
    }
  ]);

return (
  <>
    <RouterProvider router={router} />
  </>
)
}

export default App
