import React from 'react'
import "./EditProfile.css"
import image3 from "../../assets/asset-3.jpeg"

function EditProfile() {
  return (
    <div className='editprofile'>
      <h2 className='edit-header'>Update Profile</h2>
      <div className='editprofile-pic'>
        <img src={image3} alt="profile-pic"/>
      </div>
      <div className='editprofile-details'>
        <div><label>Profile Picture: </label><input type="file" accept=".png, .jpg, .jpeg .webp"/></div>
        <div><label>First Name: </label><input type="text" id='FirstName' value="Timilehin"/></div>
        <div><label>Last Name: </label><input type="text" id='LastName' value="Okunola"/></div>
        <div><label>Username: </label><input type="text" id='username' value="OkTimmy"/></div>
        <div><label>Email Address: </label><input type="text" id='email' value="Oktimmy45@gmail.com"/></div>
      </div>

      <button className='edit-btn'>Save Changes</button></div>
  )
}

export default EditProfile