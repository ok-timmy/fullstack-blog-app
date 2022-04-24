import React, { useContext, useState } from "react";
import "./EditProfile.css";
import image3 from "../../assets/asset-3.jpeg";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const { user } = useContext(Context);
  const navigation = useNavigate()

  const [firstName, setFirstname] = useState(user.firstName);
  const [secondName, setSecondname] = useState(user.secondName);
  const [email, setEmail] = useState(user.email);
  const [userName, setUsername] = useState(user.userName);
  const [bio, setBio] = useState(user.bio);

  const handleInput = async(e) => {
		e.preventDefault();
		const updatedUser = { firstName, secondName, email, userName, bio };
		console.log(updatedUser);

		try{
			const res = await axios.put(`http://localhost:8000/api/auth/${user._id}`, updatedUser)
			console.log(res.data);
		}
		catch(error) {
			console.log(error);
		};
		
		navigation('/profile')
	};

  return (
    <div className="editprofile">
      <h2 className="edit-header">Update Profile</h2>
      <div className="editprofile-pic">
        <img src={image3} alt="profile-pic" />
      </div>
        <div className="profile-pic">
          <label>Profile Picture: </label>
          <input type="file" accept=".png, .jpg, .jpeg .webp" />
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

      <button className="edit-btn" onClick={handleInput}>Save Changes</button>
    </div>
  );
}

export default EditProfile;
