import React, { useContext, useState } from "react";
import "./Content.css";
import { useLocation } from "react-router-dom";
import { Context } from "../../Context/Context";
import EditPost from "../EditPost/EditPost";

function Content() {
  const [editMode, setEditMode] = useState(false);
  const { user } = useContext(Context);
  const location = useLocation();
  const { blogContent } = location.state;

  const pf = "http://localhost:8000/public/";

  // console.log(blogContent);

  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);
    const seconds = blogPubTime.getTime();

    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    console.log(timeDiff);

    //Check if time is greater than or less a day
    if (timeDiff <= 23) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }

    // console.log(pubTime);
  }

  if (editMode) {
    return <EditPost blogContent={blogContent} setEditMode={setEditMode} />;
  } else
    return (
      <div className="content">
        <div className="content-image">
          <img src={pf + blogContent.image} alt="Content emblem" />
        </div>
        <div className="space">
          <div className="content-details">
            <p className="content-category">{blogContent.category}</p>
            <p className="content-author">Published by {blogContent.author}</p>
            <p className="content-timestamp">
              Published {calcTime(blogContent.updatedAt)}
            </p>
          </div>
          {user ? (
            blogContent.author === `${user.firstName} ${user.secondName}` && (
              <div>
                <i
                  onClick={() => setEditMode(true)}
                  className="bi bi-pencil"
                ></i>

                <i className="bi bi-trash"></i>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
        <div
          className="content-story"
          dangerouslySetInnerHTML={{ __html: blogContent.content }}
        ></div>
      </div>
    );
}

export default Content;
