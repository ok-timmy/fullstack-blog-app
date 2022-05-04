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
  // console.log(blogContent);
  const [postcontent, setPostcontent] = useState(blogContent);

  useEffect(() => {
    const fetchSinglePost = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
        setPostcontent(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost(blogContent._id);
  }, [editMode]);

  console.log(postcontent);

  function calcTime(pubTime) {
    const currentTime = Date.now();
    const blogPubTime = new Date(pubTime);
    const timeDiff = (currentTime - blogPubTime) / (60 * 60 * 1000);

    //Check if time is greater than or less a day or an hour
    if (timeDiff < 1) {
      const minTime = Math.ceil(timeDiff * 60);
      return `${minTime} Minute${minTime > 1 ? "s" : ""} Ago`;
    }
    // Check if time is less than a day but greater than one hour.
    else if (timeDiff <= 23 && timeDiff > 1) {
      return `${Math.ceil(timeDiff)} Hours Ago`;
    } else {
      return `${Math.floor(timeDiff / 24)} Days Ago`;
    }
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

  const { _id, content, image, title, category, author, updatedAt } =
    postcontent;

  if (editMode) {
    return <EditPost blogContent={content} setEditMode={setEditMode} />;
  } else
    return (
      <div className="content">
        <h3 className="content-header">{title}</h3>
        {image && (
          <div className="content-image">
            <img src={pf + image} alt="Content emblem" />
          </div>
        )}
        <div className="space">
          <div className="content-details">
            <p className="content-category">{category}</p>
            <p className="content-author">Published by {author}</p>
            <p className="content-timestamp">{calcTime(updatedAt)}</p>
          </div>
          {user ? (
            content.author === `${user.firstName} ${user.secondName}` && (
              <div>
                <i
                  onClick={() => setEditMode(true)}
                  className="bi bi-pencil"
                ></i>

                <i onClick={() => openAlert(_id)} className="bi bi-trash"></i>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
        <div
          className="content-story"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    );
}

export default Content;
