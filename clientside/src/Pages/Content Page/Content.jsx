import React, { useContext, useState } from "react";
import "./Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import EditPost from "../EditPost/EditPost";
import axios from "axios";
import { useEffect } from "react";

function Content() {
  const [editMode, setEditMode] = useState(false);
  const { user } = useContext(Context);
  const location = useLocation();
  const { blogContent } = location.state;
  const navigation = useNavigate();

  const pf = "http://localhost:8000/public/";
  const [content, setContent] = useState(blogContent);

  useEffect(() => {
    const fetchSinglePost = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
        setContent(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost(blogContent._id);
  }, [editMode]);

  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);

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

  //DELETE POST
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:8000/api/post/${id}`);
  };

  const openAlert = (id) => {
    let text = "Are You sure You want to delete this Blog Post?";
    if (window.confirm(text) === true) {
      try {
        deletePost(id);
        navigation("/blog");
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  if (editMode) {
    return <EditPost blogContent={content} setEditMode={setEditMode} />;
  } else
    return (
      <div className="content">
        <h3 className="content-header">{content.title}</h3>
        {content.image && (
          <div className="content-image">
            <img src={pf + content.image} alt="Content emblem" />
          </div>
        )}
        <div className="space">
          <div className="content-details">
            <p className="content-category">{content.category}</p>
            <p className="content-author">Published by {content.author}</p>
            <p className="content-timestamp">
              Published {calcTime(content.updatedAt)}
            </p>
          </div>
          {user ? (
            content.author === `${user.firstName} ${user.secondName}` && (
              <div>
                <i
                  onClick={() => setEditMode(true)}
                  className="bi bi-pencil"
                ></i>

                <i
                  onClick={() => openAlert(content._id)}
                  className="bi bi-trash"
                ></i>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
        <div
          className="content-story"
          dangerouslySetInnerHTML={{ __html: content.content }}
        ></div>
      </div>
    );
}

export default Content;
