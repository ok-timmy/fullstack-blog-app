import React from "react";
import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Blogpage from "./Pages/Blogs Page/Blogpage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Publish from "./Pages/Publish-Post/Publish";
import Content from "./Pages/Content Page/Content";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile Page/Profile";
import Footer from "./Components/Footer/Footer";
import RequireAuth from "./Redux/Auth/RequireAuth";

function App() {
  return (
    <>
      {" "}
      <Header />
      <Routes>
        <Route>
          {/* Unprotected Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blogpage />} />
            <Route path="/blog/:title" element={<Content />} />
          </Route>

          <Route element={<RequireAuth />}>
            {/* Protected Routes */}
            <Route path="/publish" element={<Publish />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
