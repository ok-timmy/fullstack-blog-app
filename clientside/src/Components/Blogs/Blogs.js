import React from "react";
import "./Blogs.css";
import imageOne from "../../assets/asset-1.webp";
import { Link } from "react-router-dom";

function Blogs({ hpBlogs }) {
  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    //Check if time is greater than or less a day
    if (timeDiff <= 23) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>Recent Blogs</h2>
      <div className="blog-section">
        <div className="blogs">
          {hpBlogs.map((hpBlog) => {
            return (
              <div key={hpBlog._id} className="card">
                <div className="card-image">
                  <img src={imageOne} alt={"post-img"} />
                </div>
                <div className="category">
                  <button>{hpBlog.category}</button>
                </div>
                <div className="card-details">
                  <div className="class-header">
                    <h3>{hpBlog.title}</h3>
                  </div>
                  <div>
                    <p>{hpBlog.excerpt}</p>
                  </div>
                  <h5>{hpBlog.author}</h5>
                  <span>{calcTime(hpBlog.updatedAt)}</span>
                  <div>
                    <button className="read-more">
                      <Link
                        to={`/blog/:${hpBlog._id}`}
                        state={{ blogContent: hpBlog }}
                      >
                        Read More
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       
        <div className="categories">
          <h2>Categories</h2>
          <div>
            <ul>
              <li> Sports </li>
              <li>Romance</li>
              <li>Adventure</li>
              <li>Poems</li>
              <li>Movies</li>
              <li>Animations</li>
            </ul>
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
