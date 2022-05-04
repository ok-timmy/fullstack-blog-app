import React from "react";
import "./Blogs.css";
import { Link} from "react-router-dom";

function Blogs({ hpBlogs }) {
  const latestBlogsArray = [...hpBlogs].reverse();
  // console.log(latestBlogsArray);
  const slicedArray = latestBlogsArray.slice(0, 3);

  // const navigation = useNavigate();

  const pf = "http://localhost:8000/public/";

  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    //Check if time is greater than or less a day or an hour
    if (timeDiff < 1) {
      const minTime = Math.ceil(timeDiff * 60);
      return `${minTime} Minute${minTime > 1 ? "s" : ""} Ago`;
    }

    //Check if time is greater than or less a day
    else if (timeDiff <= 23) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>Blog Posts</h2>
      <div className="blog-section">
        <div className="blogs">
          {slicedArray.map((hpBlog) => {
            return (
              <div key={hpBlog._id} className="card">
                <div className="card-image">
                  <img src={pf + hpBlog.image} alt={"post-img"} />
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
          <h2>Recent Posts</h2>
          <hr />
          <div className="recent-post-div">
            {latestBlogsArray.map((latestBlog) => {
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
            })}
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
