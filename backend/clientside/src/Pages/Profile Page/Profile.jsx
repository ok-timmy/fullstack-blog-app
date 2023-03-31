import React, { useContext } from "react";
import "./Profile.css";
import avatar from "../../assets/avatar.png";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../Redux/Auth/authApiSlice";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
// import axiosInstance from "../../config";

function Profile() {
  const [userPosts, setuserPosts] = useState();
  const user = useSelector(setCurrentUser);
  const {
    data: userDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserDetailsQuery(user.email);
  console.log(userDetails);

  if (isLoading) {
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
            <span>{bio || "No Bio Yet."}</span>
          </div>
        </div>
        <button className="edit-profile-btn">
          <Link to={"/edit-profile"} className="edit-link">
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
