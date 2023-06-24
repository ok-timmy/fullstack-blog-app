import React from "react";
import "./Profile.css";
import avatar from "../../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../Redux/Auth/authApiSlice";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import EditProfile from "../Edit-Profile/EditProfile";
import { useGetLoggedInUserBlogPostsQuery } from "../../Redux/Blogs/blogApiSlice";
import BlogCard from "../../Components/BlogCard/BlogCard";

function Profile() {
  // const [userPosts, setuserPosts] = useState();
  const user = useSelector(setCurrentUser);
  const {
    data: userDetails,
    isLoading,
    isError,
    // isSuccess,
    isFetching,
  } = useGetUserDetailsQuery(user.email);

  const location = useLocation();

  if (location.search === "?edit") {
    return <EditProfile />;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Sorry, Something went wrong, please try again...</div>;
  } else {
    const { firstName, secondName, image, userName, email, bio } = userDetails;

    return (
      <div className="profile">
        <div className="profile-pic">
          {image ? (
            <img src={image} alt="profile-pic" />
          ) : (
            <img src={avatar} alt="profile-pic" />
          )}
        </div>
        <div className="profile-details">
          <div className="firstName">
            <label>First Name </label>
            <span>{firstName}</span>
          </div>
          <div className="secondName">
            <label>Last Name </label>
            <span>{secondName}</span>
          </div>
          <div className="userName">
            <label>Username </label>
            <span>{userName}</span>
          </div>
          <div className="email">
            <label>Email</label>
            <span>{email}</span>
          </div>
        </div>
          <div className="bio">
            <label>Short Bio</label>
            <div className="bio__Content">
              {bio
                ? bio
                : "No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet.No Bio Yet."}
            </div>
          </div>
        <button className="edit-profile-btn">
          <Link
            to={"?edit"}
            state={{ user: userDetails }}
            className="edit-link"
          >
            Edit Profile
          </Link>
        </button>
        <div>
          <h3>Some of your Works</h3>
          <UserBlogPosts email={email} />
        </div>
      </div>
    );
  }
}

export default Profile;

export const UserBlogPosts = ({ email }) => {
  const {
    data: userPosts,
    isLoading,
    isFetching,
    isError,
  } = useGetLoggedInUserBlogPostsQuery(email);

  if (isLoading || isFetching) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <div>Something Went Wrong.... Try Again</div>;
  }

  return (
    <div>
      {" "}
      {userPosts.length !== 0 ? (
        userPosts.map((userPost) => {
          return (
            <div className="users__posts" key={userPost._id}>
              <BlogCard hpBlog={userPost} />
            </div>
          );
        })
      ) : (
        <div>You Dont have any post</div>
      )}
    </div>
  );
};
