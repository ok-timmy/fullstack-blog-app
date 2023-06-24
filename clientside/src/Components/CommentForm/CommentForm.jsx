import React, { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "./CommentForm.css";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import { useCommentOnBlogPostMutation } from "../../Redux/Blogs/blogApiSlice";
import Comments from "../Comments/Comments";

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
  // const { _id, firstName, secondName, image } = user;

  const [comment, setComment] = useState("");
  const [sendComment, { isLoading, isSuccess }] =
    useCommentOnBlogPostMutation();

  const commentDetails = {
    postId,
    commenter: user?._id,
    content: comment,
  };

  const submitComment = async () => {
    if (!commentDetails.commenter || commentDetails.commenter === null) {
      alert("You have to be logged in in order to comment!");
    }
    const response = await sendComment({ ...commentDetails });
    if (response.status === 200) {
      setComment("");
    }
    // console.log(response);
  };

  return (
    <Fragment>
      <div className="commentForm__header">Leave A Comment</div>
      {/* <form> */}
      <div className="main__comment__form">
        {user && <div className="loggedIn__user">
          <img src={user?.image} alt="user" className="image" />
          <p className="username">{`${user?.firstName} ${user?.secondName}`}</p>
        </div>}

        <div className="comment__form">
          <label className="label">Type your comment</label>
          <ReactQuill
            className="quill__comment"
            theme="snow"
            onChange={setComment}
            modules={modules}
            placeholder="Type your comment here....."
          />
          <button className="submit__btn" onClick={submitComment}>
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>
      {/* </form> */}

      <Comments postId={postId} hasCommentSucceeded={isSuccess} />
    </Fragment>
  );
};

export default CommentForm;
