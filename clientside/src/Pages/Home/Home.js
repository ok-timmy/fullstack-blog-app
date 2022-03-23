import React from "react";
import Blogs from "../../Components/Blogs";
import Header from "../../Components/Header";
import Newsletter from "../../Components/Newsletter";
import "./Home.css"

function Home() {
	return (
		<>
			<Header />
			<main>
				<div>
          <p>Beautiful Articles Start by Reading a Lot and then Writing Them down.</p>
          <p>Start Your Journey to Becoming a Writer</p>
          <button>Start Now</button>
        </div>
			</main>
			<Blogs/>
      <Newsletter/>
		</>
	);
}

export default Home;
