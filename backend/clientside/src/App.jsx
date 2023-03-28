import React, { useEffect, useState } from "react";
import  Layout from "./Components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Blogpage from "./Pages/Blogs Page/Blogpage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Publish from "./Pages/Publish-Post/publish";
import Content from "./Pages/Content Page/Content";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile Page/Profile";
import EditProfile from "./Pages/Edit-Profile/EditProfile";
import Footer from "./Components/Footer/Footer";
import RequireAuth from "./Redux/Auth/requireAuth";

function App() {

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route>
            {/* Unprotected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route lement={<RequireAuth />}>
              {/* Protected Routes */}
              <Route path="/blog" element={<Blogpage />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/blog/:id" element={<Content />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
