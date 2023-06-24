import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import "./BlogCard.css";
import { calcTime } from "../../Utilities/FormatTime";

function BlogCard({ hpBlog }) {
  const [isLiked, setIsLiked] = useState(false);
  const [postDetails, setPostDetails] = useState(hpBlog);

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
        // console.log(error);
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
            <Link to={`/blog/:${title}`} state={{ blogContent: hpBlog }}>
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
