import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import "./BlogComponent.css";
import { calcTime } from "../../Utilities/FormatTime";
import { useEditBlogPostLikesMutation } from "../../Redux/Blogs/blogApiSlice";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";

function BlogComponent({ hpBlog }) {
  const user = useSelector(setCurrentUser);

  const [editBlogPostLikes] = useEditBlogPostLikesMutation();
  const { image, _id, title, excerpt, numberOfLikes, likesArray, createdAt } =
    hpBlog;

  const [totalLikes, setTotalLikes] = useState(numberOfLikes);

  const checkFirst = (likesArray) => {
    const result = likesArray.filter((e) => {
      if (user.email === e) {
        return true;
      }
      return false;
    });
    return result;
  };

  console.log(likesArray);
  const [isLiked, setIsLiked] = useState(checkFirst(likesArray));

  const checkIfLiked = (likesArray, newTotalLikes) => {
    const yes = likesArray.filter((e, index) => {
      if (e === likesArray[index]) {
        return true;
      }
      return false;
    });

    console.log(yes);

    if (yes) {
      setIsLiked(!isLiked);
      setTotalLikes(newTotalLikes);
    } else {
      setIsLiked(!isLiked);
      setTotalLikes(newTotalLikes);
    }
  };

  const handleLikeFunction = async () => {
    const resp = await editBlogPostLikes({
      postId: _id,
      userEmail: user.email,
    }).unwrap();
    console.log(resp);
    const { likesArray, totalLikes } = resp.data;
    checkIfLiked(likesArray, totalLikes);
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
              {isLiked ? (
                <i className="bi bi-heart-fill like"></i>
              ) : (
                <i className="bi bi-heart like"></i>
              )}
            </button>
            {totalLikes}
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
