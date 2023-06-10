import React, { useState } from "react";
import "./EditProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserDetailsMutation } from "../../Redux/Auth/authApiSlice";

function EditProfile() {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  const user = location.state.user;
  console.log(user, "User details in state")

  // const [firstName, setFirstname] = useState(user.firstName);
  // const [secondName, setSecondname] = useState(user.secondName);
  // const [email, setEmail] = useState(user.email);
  const firstName = user.firstName;
  const secondName = user.secondName;
  const email = user.email
  const [userName, setUsername] = useState(user.userName);
  const [bio, setBio] = useState(user.bio);
  const [file, setFile] = useState(null);
  const profilepic = user.image;

  let image = user.image;

  const [updatedUserDetails, { isLoading, isSuccess }] =
    useUpdateUserDetailsMutation();
  const handleInput = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: user._id.toString(),
      firstName,
      secondName,
      email,
      userName,
      bio,
      file,
      image,
    };

    console.log(updatedUser.id)
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.image = fileName;
    }

   const result = await updatedUserDetails(updatedUser ).unwrap();
   console.log(result);
   console.log(isSuccess, "isSuccess")
   console.log(isLoading, "IsLoading")
   navigate("/profile");

    if (isSuccess) {
      //Go back to Profile Page
    }
  };

  return (
    <div className="editprofile">
      <h2 className="edit-header">Update Profile</h2>
      <div className="editprofile-pic">
        {file ? (
          <img src={URL.createObjectURL(file)} alt="profile-pic" />
        ) : (
          profilepic && <img src={profilepic} alt="profile-pic" />
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
            onChange={(e) => {return}}
          />
        </div>
        <div>
          <label>Second Name: </label>
          <input
            type="text"
            id="LastName"
            value={secondName}
            onChange={(e) => {return}}
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
            onChange={(e) => {return}}
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
        {isLoading ? "Loading...." : "Save Changes"}
      </button>
    </div>
  );
}

export default EditProfile;
