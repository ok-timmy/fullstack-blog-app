import React, { useContext } from "react";
import "./Profile.css";
import avatar from "../../assets/avatar.png";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(Context);
  // console.log(user);

  const pf = "http://localhost:8000/public/";

  const { image, firstName, secondName, userName, email, bio } = user;

  return (
    <div className="profile">
      <div className="profile-pic">
        {image ? (
          <img src={pf + image} alt="profile-pic" />
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
          <span>{bio || 'No Bio Yet.'}</span>
        </div>
      </div>

      <button className="edit-btn">
        <Link to={"/edit-profile"} className="edit-link">
          Edit Profile
        </Link>
      </button>
      <div>
        <h3>Some of your Works</h3>
        {/* <div></div> */}
        Here we will display some of the Author Previous works
      </div>
    </div>
  );
}

export default Profile;
