import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import "./BlogComponent.css";
import { calcTime } from "../../Utilities/FormatTime";

function BlogComponent({ hpBlog }) {
  const [isLiked, setIsLiked] = useState(false);

  const { image, _id, title, excerpt, likes, createdAt } = hpBlog;



  // const updateLikes = async (id, y) => {
  //   await axios.patch(`http://localhost:8000/api/post/updatelikes/${id}`, {
  //     likes: y + 1,
  //   });
  //   setIsLiked(true);
  // };

  // const decreaseLikes = async (id, y) => {
  //   await axios.patch(`http://localhost:8000/api/post/updatelikes/${id}`, {
  //     likes: y - 1,
  //   });
  //   setIsLiked(false);
  // };

  return (
    <div className="post">
      {image && (
        <div className="post-image">
          <img src={image} alt={"blog"} />
        </div>
      )}
      <div className="post-main">
        <h3>{title}</h3>
        <p>{excerpt} </p>
        <button className="more">
          <Link to={`/blog/:${_id}`} state={{ blogContent: hpBlog }}>
            Read More
          </Link>
        </button>
        <p className="post-time">{calcTime(createdAt)}</p>
        <div className="icons__section">
          <span>
            <button
              // onClick={() => {
              //   isLiked ? decreaseLikes(_id, likes) : updateLikes(_id, likes);
              // }}
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
  );
}

export default BlogComponent;
