import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
import "./Blogpage.css";
import { category } from "../../Utilities/Category";
import { useGetAllBlogPostQuery } from "../../Redux/Blogs/blogApiSlice";

function Blogpage() {
  const { data: hpBlogs, isLoading, isError, error } = useGetAllBlogPostQuery();
  // console.log(error);
  // console.log(hpBlogs);

  const [filterCategory, setfilterCategory] = useState(category[0]);
  const [filteredBlogs, setfilteredBlogs] = useState([]);

  useEffect(() => {
    hpBlogs && setfilteredBlogs(hpBlogs);
    const filterPosts = (x, ys) => {
      if (x.value === "All Categories") {
        setfilteredBlogs(ys);
      } else {
        const filteredPost =
          ys &&
          [...ys].filter((y) => {
            const filt = y.category === x.value;
            return filt;
          });
        setfilteredBlogs(filteredPost);
      }
    };

    filterPosts(filterCategory, hpBlogs);
  }, [filterCategory, hpBlogs]);

  // console.log(filteredBlogs);

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

      {isError ? (
        <div className="no-blog"> Something Went Wrong.....</div>
      ) : isLoading ? (
        <div className="loader"></div>
      ) : filteredBlogs &&
        (filteredBlogs.length === 0) ? (
        <div className="no-blog">
          {" "}
          There are No Blog posts for this category yet.
        </div>
      ) : (
        filteredBlogs &&
        [...filteredBlogs]?.reverse().map((hpBlog) => {
          return <BlogComponent key={hpBlog._id} hpBlog={hpBlog} />;
        })
      )}
    </div>
  );
}

export default Blogpage;
