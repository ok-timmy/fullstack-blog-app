import React from "react";
import Header from "../../Components/Header/Header";
import Blogs from '../../Components/Blogs/Blogs';
import Blogpage from "../Blogs Page/Blogpage";
// import Newsletter from "../../Components/Newsletter";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />
      <main>
        <div>
          <p>
            Beautiful Articles Start by Reading a Lot and then Writing Them
            down.
          </p>
          <p>Start Your Journey to Becoming a Writer</p>
          <button className="start">Start Now</button>
        </div>
      </main>
      <Blogs/>
      {/* <Newsletter/> */}
    </>
  );
}

export default Home;
