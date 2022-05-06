import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blogpage.css";

function Blogpage() {
  const category = [
    { id: 1, value: "All Categories" },
    { id: 2, value: "Sport" },
    { id: 3, value: "Romance" },
    { id: 4, value: "Prose" },
    { id: 5, value: "Poetry" },
    { id: 6, value: "Adventure" },
  ];

  const [filterCategory, setfilterCategory] = useState(category[0]);
  const [hpBlogs, setHpBlogs] = useState([]);
  const [filteredBlogs, setfilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const pf = "http://localhost:8000/public/";

  function calcTime(pubTime) {
    const currentTime = Date.now();
    // console.log(currentTime);
    const blogPubTime = new Date(pubTime);
    // console.log(seconds);

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    //Check if time is less than one hour
    if (timeDiff < 1) {
      const minTime = Math.ceil(timeDiff * 60);
      return `${minTime} Minute${minTime > 1 ? "s" : ""} Ago`;
    }
    //Check if time is less than than a 24 hours
    else if (timeDiff <= 23) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }
  }

  console.log(filteredBlogs);

  const fetchBlogs = async () => {
    const { data } = await axios.get("http://localhost:8000/api/post/allposts");
    const reversedData = [...data].reverse();
    setHpBlogs(reversedData);
    setfilteredBlogs(reversedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setfilteredBlogs(hpBlogs);
    const filterPosts = (x, ys) => {
      if (x.value === "All Categories") {
        // console.log(ys);
        setfilteredBlogs(ys);
      } else {
        const filteredPost = ys.filter((y) => {
          const filt = y.category === x.value;
          return filt;
        });
        setfilteredBlogs(filteredPost);
      }
    };

    filterPosts(filterCategory, hpBlogs);
  }, [filterCategory]);

  return (
    <div className="blogpage">
      <h2 className="heading">Latest Posts</h2>
      <div className="category-heading">
        <p className="blog-category">{filterCategory.value}</p>
        <span className="filter">
          {" "}
          Filter:{" "}
          <select
            onChange={(e) => {
              setfilterCategory(category[e.target.value]);
            }}
          >
            {category.map((f) => {
              return (
                <option key={f.id} value={f.id - 1} id={f.id}>
                  {f.value}
                </option>
              );
            })}
          </select>
        </span>
      </div>

      { isLoading ? 
        (<div className="no-blog"> Loading....</div>)
       :
        filteredBlogs.length === 0 ? 
          (<div className="no-blog"> There are No Blog posts for this category yet.</div>)
         : (
          filteredBlogs.map((hpBlog) => {
            return (
              <div key={hpBlog._id} className="post">
                {hpBlog.image && (
                  <div className="post-image">
                    <img src={pf + hpBlog.image} alt={"blog"} />
                  </div>
                )}
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
          })
        )
      }
    </div>
  );
}

export default Blogpage;
