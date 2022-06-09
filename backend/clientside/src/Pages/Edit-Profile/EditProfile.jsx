import React, { useContext, useState } from "react";
import "./EditProfile.css";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../config";

function EditProfile() {
  const { user, dispatch } = useContext(Context);
  const navigation = useNavigate();

  const id = user._id;

  const [firstName, setFirstname] = useState(user.firstName);
  const [secondName, setSecondname] = useState(user.secondName);
  const [email, setEmail] = useState(user.email);
  const [userName, setUsername] = useState(user.userName);
  const [bio, setBio] = useState(user.bio);
  const [file, setFile] = useState(null);
  const profilepic = user.image;
 

  const pf = "http://localhost:8000/public/";
  let image = user.image;

  const handleInput = async (e) => {
    e.preventDefault();
    const updatedUser = {
      firstName,
      secondName,
      email,
      userName,
      bio,
      file,
      image,
    };
    // console.log(updatedUser);

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.image = fileName;

      try {
        await axiosInstance.post("http://localhost:8000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
       await axiosInstance.put(
        `http://localhost:8000/api/auth/${id}`,
        updatedUser
      );
      // console.log(res.data);   

    } catch (error) {
      console.log(error);
    }
    const user = await axiosInstance.get(
      `http://localhost:8000/api/auth/${email}`
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: user.data });
    // console.log(user.data);

    navigation("/profile");
  };

  return (
    <div className="editprofile">
      <h2 className="edit-header">Update Profile</h2>
      <div className="editprofile-pic">
        {file ? (
          <img src={URL.createObjectURL(file)} alt="profile-pic" />
        ) : profilepic ? (
          <img src={pf + profilepic} alt="profile-pic" />
        ) : (
          // <img src={image3} alt="profile-pic" />
          null
        )}
      </div>
      <div className="profile-pic">
        <label>Profile Picture: </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg .webp"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="editprofile-details">
        <div>
          <label>First Name: </label>
          <input
            type="text"
            id="FirstName"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Second Name: </label>
          <input
            type="text"
            id="LastName"
            value={secondName}
            onChange={(e) => setSecondname(e.target.value)}
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email Address: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="short-bio">
        <label>Short Bio: </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={150}
        />
      </div>

      <button className="edit-btn" onClick={handleInput}>
        Save Changes
      </button>
    </div>
  );
}

export default EditProfile;
