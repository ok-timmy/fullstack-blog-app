import React from "react";
import { Link } from "react-router-dom";
import Blogs from "../../Components/Blogs/Blogs";
import Newsletter from "../../Components/Newletter/Newsletter";
import "./Home.css";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";

function Home() {
  const user = useSelector(setCurrentUser);
  return (
    <>
      <main>
        <div>
          <p className="intro-text">
            SHOWCASE YOUR <span>CREATIVITY</span>
          </p>
          <p className="desc">Start Your Journey to Becoming a Writer</p>
          <button className="start">
            <Link to={user ? "/publish" : "/register"}>Start Now</Link>
          </button>
        </div>
      </main>
      <Blogs />
      <Newsletter />
    </>
  );
}

export default Home;
