import React from "react";
import "./Blogs.css";
import { Link } from "react-router-dom";
import BlogCard from "../BlogCard/BlogCard";
import { calcTime } from "../../Utilities/FormatTime";
import { useGetAllBlogPostQuery } from "../../Redux/Blogs/blogApiSlice";

function Blogs() {
  const { data: hpBlogs, isLoading, isError, error } = useGetAllBlogPostQuery();
  // console.log(hpBlogs);
  // console.log(error);

  if (isError) {
    return (
      <>
        <h2 className="blogPost__header">Blog Posts</h2>
        <div className="blog-section">
          <div className="blogs">Something Went Wrong....</div>
          <div className="categories">
            <h2>Recent Posts</h2>
            <hr />
            <div className="recent-post-div">Something Went Wrong....</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="blogPost__header">Blog Posts</h2>
      <div className="blog-section">
        <div className="blogs">
          {isLoading ? (
            <div className="loader"></div>
          ) : !hpBlogs ? (
            <div>No Blog Post Created Yet</div>
          ) : (
            hpBlogs
              ?.reverse()
              .slice(0, 3)
              .map((hpBlog) => {
                return <BlogCard key={hpBlog._id} hpBlog={hpBlog} />;
              })
          )}
        </div>

        <div className="categories">
          <h2>Recent Posts</h2>
          <hr />
          <div className="recent-post-div">
            {isLoading ? (
              <div className="loader-div">
                <div className="loader"></div>
              </div>
            ) : (
              hpBlogs
                ?.reverse()
                .slice(0, 5)
                .map((latestBlog) => {
                  return (
                    <div key={latestBlog._id}>
                      {" "}
                      <div className="each-recent-post">
                        <h2>{latestBlog.title}</h2>
                        <p>{calcTime(latestBlog.createdAt)}</p>
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
                })
            )}
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
