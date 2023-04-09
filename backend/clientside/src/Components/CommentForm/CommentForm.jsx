import React, { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "./CommentForm.css";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import { useCommentOnBlogPostMutation } from "../../Redux/Blogs/blogApiSlice";

const CommentForm = ({ postId }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const user = useSelector(setCurrentUser);
  const { firstName, secondName, image } = user;

  const [comment, setComment] = useState("");
  const [sendComment, { isLoading, isSuccess }] =
    useCommentOnBlogPostMutation();
  const commentDetails = {
    postId,
    commenter: `${firstName} ${secondName}`,
    content: comment,
  };

  const submitComment = async () => {
    if (!commentDetails.commenter) {
      alert("You have to be logged in in order to comment!");
    }
    const response = await sendComment({ ...commentDetails });
    console.log(response);
  };

  return (
    <Fragment>
      <div>Comment</div>
      <form>
        <div className="main__comment__form">
          <div className="loggedIn__user">
            <img src={image} alt="user" className="image"/>
            <p className="username">{`${firstName} ${secondName}`}</p>
          </div>

          <div className="comment__form">
            <label className="label">Type your comment</label>
            <ReactQuill
              className="quill"
              theme="snow"
              onChange={setComment}
              modules={modules}
              placeholder="Type your comment here....."
            />
            <button className="submit__btn" onClick={submitComment}>{isLoading? "Submitting" : "Submit Comment"}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CommentForm;
