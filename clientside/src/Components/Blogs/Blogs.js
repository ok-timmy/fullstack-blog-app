import React from "react";
import "./Blogs.css";
import imageOne from "../../assets/asset-1.webp";
import { Link } from "react-router-dom";

function Blogs({hpBlogs}) {
  return (
    <div className="blog-section">
      <div className="blogs">

        {hpBlogs.map((hpBlog)=> {
       return <div key={hpBlog._id} className="card">
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
              <p>
                {hpBlog.excerpt}
              </p>
            </div>
            <h5>{hpBlog.author}</h5>
            <span>5 Days ago</span>
            <div>
              <button className="read-more">Read More</button>
            </div>
          </div>
        </div>
        })}
        {/* <div className="card">
          <div className="card-image">
            <img src={imageOne} alt={"post-img"} />
          </div>
          <div className="category">
            <button>Sports</button>
          </div>
          <div className="card-details">
            <div className="class-header">
              <h3>How To Make Morroco Bread in five steps</h3>
            </div>
            <div>
              <p>
                All he could think about was how it would all end. There was
                still a bit of uncertainty in the equation.
              </p>
            </div>
            <h5>Saraki Oladimeji</h5>
            <span>5 Days ago</span>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src={imageOne} alt={"post-img"} />
          </div>
          <div className="category">
            <button>Sports</button>
          </div>
          <div className="card-details">
            <div className="class-header">
              <h3>How To Make Morroco Bread in five steps</h3>
            </div>
            <div>
              <p>
                All he could think about was how it would all end. There was
                still a bit of uncertainty in the equation.
              </p>
            </div>
            <h5>Saraki Oladimeji</h5>
            <span>5 Days ago</span>
          </div>
        </div> */}
      </div>
      <Link to={'/blog'}><button className="more-btn">More Posts</button></Link>
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
  );
}

export default Blogs;
