import React, { useState } from "react";
import "./Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import EditPost from "../EditPost/EditPost";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { calcTime } from "../../Utilities/FormatTime";
import { useDeleteBlogPostMutation, useGetSingleBlogPostContentQuery } from "../../Redux/Blogs/blogApiSlice";

function Content() {
  const user = useSelector(setCurrentUser);
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const location = useLocation();
  const navigation = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const locate = location.pathname;
  const pathId = locate.split("/")[2];


  const openAlert = async(id) => {
    let text = "Are You sure You want to delete this Blog Post?";
    if (window.confirm(text) === true) {
      try {
        await deleteBlogPost(id).unwrap();
        navigation("/blog");
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  if (location.state) {
   return <FetchContentFromState
      editMode={editMode}
      location={location}
      setEditMode={setEditMode}
      user={user}
      openAlert={openAlert}
    />;
  } else
    return (
      <FetchContentFromAPI pathId={pathId} user={user} openAlert={openAlert} />
    );
}

const FetchContentFromState = ({
  editMode,
  location,
  setEditMode,
  user,
  openAlert,
}) => {
  const postcontent = location.state.blogContent;

  return editMode ? (
    <EditPost blogContent={postcontent.content} setEditMode={setEditMode} />
  ) : (
    <div className="content">
      <h3 className="content-header">{postcontent.title}</h3>
      {postcontent.image && (
        <div className="content-image">
          <img
            src={postcontent.image && postcontent.image}
            alt="Content emblem"
          />
        </div>
      )}
      <div className="space">
        <div className="content-details">
          <p className="content-category">{postcontent.category}</p>
          <p className="content-author">Published by {postcontent.author}</p>
          <p className="content-timestamp">{calcTime(postcontent.updatedAt)}</p>
        </div>
        {user && (
          (postcontent.author ===
            `${user.firstName} ${user.secondName}`) && (
            <div>
              <i onClick={() => setEditMode(true)} className="bi bi-pencil"></i>

              <i
                onClick={() => openAlert(postcontent._id)}
                className="bi bi-trash"
              ></i>
            </div>
          )
        )}
      </div>
      <div
        className="content-story"
        dangerouslySetInnerHTML={{ __html: postcontent.content }}
      ></div>
    </div>
  );
};

const FetchContentFromAPI = ({ pathId, user, openAlert }) => {
  const [editMode, setEditMode] = useState(false);

  console.log(pathId);
  const {
    data: postcontent,
    isLoading,
    isError,
  } = useGetSingleBlogPostContentQuery(pathId);

  console.log("I dey cook");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An Error Occured, Please try again</div>;
  }

  return editMode ? (
    <EditPost blogContent={postcontent.content} setEditMode={setEditMode} />
  ) : (
    <div className="content">
      <h3 className="content-header">{postcontent.title}</h3>
      {postcontent.image && (
        <div className="content-image">
          <img
            src={postcontent.image && postcontent.image}
            alt="Content emblem"
          />
        </div>
      )}
      <div className="space">
        <div className="content-details">
          <p className="content-category">{postcontent.category}</p>
          <p className="content-author">Published by {postcontent.author}</p>
          <p className="content-timestamp">{calcTime(postcontent.updatedAt)}</p>
        </div>
        {user ? (
          postcontent.content.author ===
            `${user.firstName} ${user.secondName}` && (
            <div>
              <i onClick={() => setEditMode(true)} className="bi bi-pencil"></i>

              <i
                onClick={() => openAlert(postcontent._id)}
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
        dangerouslySetInnerHTML={{ __html: postcontent.content }}
      ></div>
    </div>
  );
};

export default Content;
