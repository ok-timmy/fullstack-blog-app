import React from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import "./BlogComponent.css";
import { calcTime } from "../../Utilities/FormatTime";
import { useEditBlogPostLikesMutation } from "../../Redux/Blogs/blogApiSlice";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";

function BlogComponent({ hpBlog }) {
  // const [isLiked, setIsLiked] = useState(false);
  const user = useSelector(setCurrentUser);

  const [editBlogPostLikes, { isLoading, isError }] =
    useEditBlogPostLikesMutation();
  const { image, _id, title, excerpt, likes, createdAt } = hpBlog;

  const handleLikeFunction = async () => {
    await editBlogPostLikes({
      postId: _id,
      userEmail: user.email,
    }).unwrap();
  };

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
          <Link to={`/blog/${_id}/${title}`} state={{ blogContent: hpBlog }}>
            Read More
          </Link>
        </button>
        <p className="post-time">{calcTime(createdAt)}</p>
        <div className="icons__section">
          <span>
            <button onClick={handleLikeFunction}>
              {user ? (
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
                url: `http://localhost:3000/blog/${_id}/${title}`,
                title: `${title}`,
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
