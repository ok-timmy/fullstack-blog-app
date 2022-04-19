import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Blogpage from './Pages/Blogs Page/Blogpage';
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/Login';
import Publish from './Pages/Publish-Post/publish';
import Post from './Pages/Post Page/Post';
import Register from './Pages/Register/Register'

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/blog" element={<Blogpage/>}/>
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
        {/* <Home/> */}
        </>
    </Router>
  );
}

export default App;
