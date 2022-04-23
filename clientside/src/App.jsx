import React, {useEffect, useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Blogpage from './Pages/Blogs Page/Blogpage';
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/Login';
import Publish from './Pages/Publish-Post/publish';
// import Post from './Pages/Post Page/Post';
import Register from './Pages/Register/Register'

function App() {

  const [allblogs, setAllblogs] = useState([]);

useEffect(() => {
  const fetchBlogs = async () => {
    const {data} = await axios.get("http://localhost:8000/api/post/allposts")
    // const blogs = await response.data
    setAllblogs(data);
    // console.log(data);
  }

  fetchBlogs()
}, [])

console.log(allblogs);

const hpBlogs = allblogs.slice(0, 3)



  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home  hpBlogs={hpBlogs}/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/blog" element={<Blogpage hpBlogs={allblogs}/>}/>
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
        {/* <Home/> */}
        </>
    </Router>
  );
}

export default App;
