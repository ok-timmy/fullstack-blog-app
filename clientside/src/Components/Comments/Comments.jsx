import React from "react";
import "./Comments.css";
import { useGetBlogPostCommentsQuery } from "../../Redux/Blogs/blogApiSlice";
import { calcTime } from "../../Utilities/FormatTime";

const Comments = ({ postId, hasCommentSucceeded }) => {
  

//   console.log(postId, "Comments component");

  const {
    data: postComments,
    isLoading,
    isError,
  } = useGetBlogPostCommentsQuery(postId);

//   console.log(postComments, isLoading, isError);

  if (isLoading) {
    return <div className="loader"></div>;
  }

//   if (postComments.data.length === 0) {
//     return <div className="no__comments__yet">Be The First to write a comment</div>;
//   }

  return postComments.data.map((postComment) => {
    return (
      <div key={postComment._id} className="comment__div">
        <div className="comment__commenter">
          <img
            src={postComment?.commenter?.image}
            alt="user"
            className="image"
          />
          <p className="username">{`${postComment?.commenter?.firstName} ${postComment?.commenter?.secondName}`}</p>
        </div>
        <div className="main__comment">
          <div
            className="comment__content"
            dangerouslySetInnerHTML={{ __html: postComment?.content }}
          ></div>
          <div className="comment__time">
            <p>{calcTime(postComment?.createdAt)}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default Comments;
