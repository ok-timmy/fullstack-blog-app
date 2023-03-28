import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Blogs from "../../Components/Blogs/Blogs";
import Newsletter from "../../Components/Newletter/Newsletter";
import { Context } from "../../Context/Context";
import "./Home.css";

function Home() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <div>
          <p className="intro-text">
            Beautiful Articles Start by Reading a Lot and then Writing Them
            down.
          </p>
          <p>Start Your Journey to Becoming a Writer</p>
          <button className="start">
            <Link
            // to={user ? '/publish' : '/register'}
            >
              Start Now
            </Link>
          </button>
        </div>
      </main>
      {/* <Blogs hpBlogs={hpBlogs} isFetching={isFetching}/>
      <Newsletter/> */}
    </>
  );
}

export default Home;
