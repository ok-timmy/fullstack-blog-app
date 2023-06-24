import React, { useState } from "react";
import "./Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import EditPost from "../EditPost/EditPost";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { calcTime } from "../../Utilities/FormatTime";
import {
  useDeleteBlogPostMutation,
  useGetSingleBlogPostContentQuery,
} from "../../Redux/Blogs/blogApiSlice";
import CommentForm from "../../Components/CommentForm/CommentForm";

function Content() {
  const user = useSelector(setCurrentUser);
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const location = useLocation();
  const navigation = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const locate = location.pathname;
  const pathName = locate.split("/")[2];
  const normalPathName = pathName.split("%20").join(" ")
  // console.log(normalPathName);

  const openAlert = async (id) => {
    let text = "Are You sure You want to delete this Blog Post?";
    if (window.confirm(text) === true) {
      try {
        await deleteBlogPost(id).unwrap();
        navigation("/blog");
      } catch (error) {
        console.log(error, "Could Not Delete Post");
      }
    } else {
      return;
    }
  };

  if (location.state) {
    return (
      <FetchContentFromState
        editMode={editMode}
        location={location}
        setEditMode={setEditMode}
        user={user}
        openAlert={openAlert}
      />
    );
  } else
    return (
      <FetchContentFromAPI
        pathName={normalPathName}
        user={user}
        openAlert={openAlert}
      />
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
    <EditPost blogContent={postcontent} setEditMode={setEditMode} />
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
          <p className="content-timestamp">{calcTime(postcontent.createdAt)}</p>
        </div>
        {user !== null &&
          postcontent.author === `${user.firstName} ${user.secondName}` && (
            <div>
              <i onClick={() => setEditMode(true)} className="bi bi-pencil"></i>

              <i
                onClick={() => openAlert(postcontent._id)}
                className="bi bi-trash"
              ></i>
            </div>
          )}
      </div>
      <div
        className="content-story"
        dangerouslySetInnerHTML={{ __html: postcontent.content }}
      ></div>
      <div>
        <button className="Likebutton">
          Like <i className="bi bi-hand-thumbs-up"></i>
        </button>
      </div>

      <CommentForm postId={postcontent._id} />

      {/* <Comments/> */}
    </div>
  );
};

const FetchContentFromAPI = ({ pathName, user, openAlert }) => {
  const [editMode, setEditMode] = useState(false);

  const postTitle = pathName
  // console.log(postTitle);

  const {
    data: postcontent,
    isLoading,
    error,
  } = useGetSingleBlogPostContentQuery(postTitle);

  // console.log(postcontent)

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
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
        {user &&
          postcontent.content.author ===
            `${user.firstName} ${user.secondName}` && (
            <div>
              <i onClick={() => setEditMode(true)} className="bi bi-pencil"></i>

              <i
                onClick={() => openAlert(postcontent._id)}
                className="bi bi-trash"
              ></i>
            </div>
          )}
      </div>
      <div
        className="content-story"
        dangerouslySetInnerHTML={{ __html: postcontent.content }}
      ></div>
      <div>
        <button className="Likebutton">
          Like <i className="bi bi-hand-thumbs-up"></i>
        </button>
      </div>
      <CommentForm postId={postcontent._id} />
    </div>
  );
};

export default Content;
