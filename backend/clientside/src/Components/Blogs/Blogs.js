import React from "react";
import "./Blogs.css";
import { Link} from "react-router-dom";
import BlogCard from "../BlogCard/BlogCard";

function Blogs({ hpBlogs, isFetching }) {
  const latestBlogsArray = [...hpBlogs].reverse();
  // console.log(latestBlogsArray);
  const slicedArray = latestBlogsArray.slice(0, 3);

  const latestBlogsArrayTwo = latestBlogsArray.slice(0,5);


  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    //Check if time is less than one hour
    if (timeDiff < 1) {
      const minTime = Math.ceil(timeDiff * 60);
      return `${minTime} Minute${minTime > 1 ? "s" : ""} Ago`;
    }
    //Check if time is less than than a 24 hours
    else if (timeDiff <= 23) {
      const hourTime = Math.ceil(timeDiff);
      return `${hourTime} Hour${hourTime>1 ? "s" : ""} Ago`;
    } else {
      const dayNumber = Math.floor(timeDiff / 24);
      return `${dayNumber} Day${dayNumber>1 ? "s" : "" } Ago`;
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>Blog Posts</h2>
      <div className="blog-section">
        <div className="blogs">
          {isFetching ? <div className="loader"></div> : slicedArray.map((hpBlog) => {
            return (
              <BlogCard  key={hpBlog._id}  hpBlog={hpBlog} />
            );
          })}
        </div>

        <div className="categories">
          <h2>Recent Posts</h2>
          <hr />
          <div className="recent-post-div">
            {isFetching ? <div className="loader-div"><div className="loader"></div></div> : latestBlogsArrayTwo.map((latestBlog) => {
              return (
                <div key={latestBlog._id}>
                  {" "}
                  <div className="each-recent-post">
                    <h2>{latestBlog.title}</h2>
                    <p>{calcTime(latestBlog.updatedAt)}</p>
                    <Link
                      to={`/blog/:${latestBlog._id}`}
                      state={{ blogContent: latestBlog }}
                    >
                      Read More
                    </Link>
                  </div>
                  <hr />
                </div>
              );
            }) }
          </div>
        </div>
      </div>
      <Link to={"/blog"}>
        <button className="more-btn">More Posts</button>
      </Link>
    </>
  );
}

export default Blogs;
