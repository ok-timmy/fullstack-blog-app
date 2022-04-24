import React from "react";
import { Link } from "react-router-dom";
import Blogs from '../../Components/Blogs/Blogs';
import Newsletter from "../../Components/Newletter/Newsletter";
import "./Home.css";

function Home({hpBlogs}) {
  return (
    <>
      {/* <Header /> */}
      <main>
        <div>
          <p>
            Beautiful Articles Start by Reading a Lot and then Writing Them
            down.
          </p>
          <p>Start Your Journey to Becoming a Writer</p>
          <button className="start"><Link to={'/register'}>Start Now</Link></button>
        </div>
      </main>
      <Blogs hpBlogs={hpBlogs}/>
      <Newsletter/>
    </>
  );
}

export default Home;
