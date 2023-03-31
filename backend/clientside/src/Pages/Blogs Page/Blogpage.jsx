import axios from "axios";
// import axiosInstance from "../../config";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
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
  const [hpBlogs, setHpBlogs] = useState();
  const [filteredBlogs, setfilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const fetchBlogs = async () => {
  //   const { data } = await axios.get("http://localhost:8000/api/post/allposts");
  //   const reversedData = [...data].reverse();
  //   setHpBlogs(reversedData);
  //   setfilteredBlogs(reversedData);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);

  // useEffect(() => {
  //   setfilteredBlogs(hpBlogs);
  //   const filterPosts = (x, ys) => {
  //     if (x.value === "All Categories") {
  //       setfilteredBlogs(ys);
  //     } else {
  //       const filteredPost = ys.filter((y) => {
  //         const filt = y.category === x.value;
  //         return filt;
  //       });
  //       setfilteredBlogs(filteredPost);
  //     }
  //   };

  //   filterPosts(filterCategory, hpBlogs);
  // }, [filterCategory]);

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

      {isLoading ? (
        <div className="loader"></div>
      ) : filteredBlogs.length === 0 ? (
        <div className="no-blog">
          {" "}
          There are No Blog posts for this category yet.
        </div>
      ) : (
        filteredBlogs.map((hpBlog) => {
          return <BlogComponent key={hpBlog._id} hpBlog={hpBlog} />;
        })
      )}
    </div>
  );
}

export default Blogpage;
