import React, { useState } from "react";
import "./Profile.css";
import avatar from "../../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserDetailsQuery} from "../../Redux/Auth/authApiSlice";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import EditProfile from "../Edit-Profile/EditProfile";


function Profile() {
  const [userPosts, setuserPosts] = useState();
  const user = useSelector(setCurrentUser);
  const {
    data: userDetails,
    isLoading,
    isError,
    // isSuccess,
    isFetching,
  } = useGetUserDetailsQuery(user.email, {});
  console.log(userDetails);

  const location = useLocation();
  console.log(location);

  if (location.search === "?edit") {
    return <EditProfile />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isFetching) {
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
          <div>
            <label>First Name: </label>
            <span>{firstName}</span>
          </div>
          <div>
            <label>Last Name: </label>
            <span>{secondName}</span>
          </div>
          <div>
            <label>Username: </label>
            <span>{userName}</span>
          </div>
          <div>
            <label>Email Address: </label>
            <span>{email}</span>
          </div>
          <div>
            <label>Short Bio:</label>
            <span>{bio ? bio : "No Bio Yet."}</span>
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
          <div>
            {!userPosts ? (
              <div className="loader"></div>
            ) : userPosts === null ? (
              userPosts.map((userPost) => {
                return <div>{userPost.title}</div>;
              })
            ) : (
              <div>You Dont have any post</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
