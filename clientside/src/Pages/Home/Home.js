import React from "react";
import Header from "../../Components/Header/Header";
// import Blogs from '../../Components/Blogs/Blogs';
// import Blogpage from "../Blogs Page/Blogpage";
// import Newsletter from "../../Components/Newletter/Newsletter";
import Register from "../Register/Register";
import "./Home.css";
import Login from "../Login/Login";

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
	  <Register/>
	  {/* <Login/> */}
      {/* <Blogs/>
      <Newsletter/> */}
    </>
  );
}

export default Home;
