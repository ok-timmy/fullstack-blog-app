import React from "react";
import { Link } from "react-router-dom";
import "./Blogpage.css";

function Blogpage({ hpBlogs }) {
  const pf = "http://localhost:8000/public/";

  return (
    <div className="blogpage">
      <h2 className="heading">Latest Posts</h2>
      <p className="blog-category">All Categories</p>

      {hpBlogs.map((hpBlog) => {
        return (
          <div key={hpBlog._id} className="post">
            <div className="post-image">
              <img src={pf + hpBlog.image} alt={"blog"} />
            </div>
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
              <p className="post-time">10 Days Ago</p>
            </div>
          </div>
        );
      })}
      {/* <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div> */}
    </div>
  );
}

export default Blogpage;
