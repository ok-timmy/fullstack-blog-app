import React, { useContext } from "react";
import "./Profile.css";
import image3 from "../../assets/asset-3.jpeg";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";

function Profile() {

  const {user} = useContext(Context);

  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={image3} alt="profile-pic" />
      </div>
      <div className="profile-details">
        <div>
          <label>First Name: </label>
          <span>{user.firstName}</span>
        </div>
        <div>
          <label>Last Name: </label>
          <span>{user.secondName}</span>
        </div>
        <div>
          <label>Username: </label>
          <span>{user.userName}</span>
        </div>
        <div>
          <label>Email Address: </label>
          <span>{user.email}</span>
        </div>
        <div>
          <label>Short Bio:</label>
          <span>
           {user.bio || `No Bio Yet......`}
          </span>
        </div>
      </div>

      <button className="edit-btn"><Link to={'/edit-profile'}>Edit Profile</Link></button>
      <div>
        <h3>Some of your Works</h3>
        {/* <div></div> */}
        Here we will display some of the Author Previous works
      </div>
    </div>
  );
}

export default Profile;
