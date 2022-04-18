import React from 'react'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header/Header';
// import Blogpage from './Pages/Blogs Page/Blogpage';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import Publish from './Pages/Publish-Post/publish';
// import Post from './Pages/Post Page/Post';
// import Register from './Pages/Register/Register'

function App() {
  return (
    // <BrowserRouter>
    // <>
    // <Header/>
    // {/* <Login/> */}
    // <Routes>
    //   <Route path='/' element={<Home/>}/>
    // </Routes>
    // </>
    // </BrowserRouter>
    <>
    {/* <Login/> */}
    <Home/>
    </>
  )
}

export default App;