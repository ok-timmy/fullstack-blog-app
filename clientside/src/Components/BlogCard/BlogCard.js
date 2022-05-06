import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import "./BlogCard.css";

function BlogCard({ hpBlog }) {
  const [isLiked, setIsLiked] = useState(false);
  const [postDetails, setPostDetails] = useState(hpBlog);

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
      return `${hourTime} Hour${hourTime > 1 ? "s" : ""} Ago`;
    } else {
      const dayNumber = Math.floor(timeDiff / 24);
      return `${dayNumber} Day${dayNumber > 1 ? "s" : ""} Ago`;
    }
  }

  const pf = "http://localhost:8000/public/";

  const updateLikes = async (id, y) => {
    await axios.patch(`http://localhost:8000/api/post/updatelikes/${id}`, {
      likes: y + 1,
    });
    setIsLiked(true);
  };

  const decreaseLikes = async (id, y) => {
    await axios.patch(`http://localhost:8000/api/post/updatelikes/${id}`, {
      likes: y - 1,
    });
    setIsLiked(false);
  };

  useEffect(() => {
    const fetchSinglePost = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
       setPostDetails(data);
        //   console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost(hpBlog._id);
  }, [isLiked]);

  const { image, _id, title, excerpt, likes, createdAt, category, author } =
    postDetails;

  return (
    <div className="blogCard">
      <div className="Card-image">
        <img src={pf + image} alt={"post-img"} />
      </div>
      <div className="Category">
        <button>{category}</button>
      </div>
      <div className="Card-details">
        <div className="Class-header">
          <h3>{title}</h3>
        </div>
        <div>
          <p>{excerpt}</p>
        </div>
        <h5>{author}</h5>
        <span>{calcTime(createdAt)}</span>
        <div>
          <button className="read-more">
            <Link to={`/blog/:${_id}`} state={{ blogContent: hpBlog }}>
              Read More
            </Link>
          </button>

          <div className="icon__section">
            <span>
              <button
                onClick={() => {
                  isLiked ? decreaseLikes(_id, likes) : updateLikes(_id, likes);
                }}
              >
                {isLiked ? (
                  <i className="bi bi-heart-fill like"></i>
                ) : (
                  <i className="bi bi-heart like"></i>
                )}
              </button>
              {likes}
            </span>

            <span>
              <RWebShare
                data={{
                  text: `Web Share - ${title}`,
                  url: `http://localhost:3000/blog/:${_id}`,
                  title: `${title}` ,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button>
                  <i className="bi bi-share share"></i>
                </button>
              </RWebShare>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
