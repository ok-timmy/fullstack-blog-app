import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blogpage.css";

function Blogpage() {
  const pf = "http://localhost:8000/public/";

  const [hpBlogs, setHpBlogs] = useState([]);

  function calcTime(pubTime) {
    const currentTime = Date.now();
    // console.log(currentTime);
    const blogPubTime = new Date(pubTime);
    // console.log(seconds);

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    console.log(timeDiff);

    //Check if time is greater than a day
    if (timeDiff <= 23) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }
  }

  // calcTime(Date.now());
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/post/allposts"
      );
      // const blogs = await response.data
      setHpBlogs(data);
      // console.log(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogpage">
      <h2 className="heading">Latest Posts</h2>
      <p className="blog-category">All Categories</p>

      {hpBlogs.map((hpBlog) => {
        return (
          <div key={hpBlog._id} className="post">
           { hpBlog.image && <div className="post-image">
              <img src={pf + hpBlog.image} alt={"blog"} />
            </div>}
            <div className="post-main">
              <h3>{hpBlog.title}</h3>
              <p>{hpBlog.excerpt} </p>
              <button className="more">
                <Link
                  to={`/blog/:${hpBlog._id}`}
                  state={{ blogContent: hpBlog }}
                >
                  Read More
                </Link>
              </button>
              <p className="post-time">{calcTime(hpBlog.updatedAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blogpage;
