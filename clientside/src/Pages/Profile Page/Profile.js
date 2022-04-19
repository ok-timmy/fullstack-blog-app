import React from 'react'
import "./Profile.css"
import image3 from "../../assets/asset-3.jpeg"

function Profile() {
  return (
    <div className='profile'>
      <div className='profile-pic'>
        <img src={image3} alt="profile-pic"/>
      </div>
      <div className='profile-details'>
        <div><label>First Name: </label><span>Timilehin</span></div>
        <div><label>Last Name: </label><span>Okunola</span></div>
        <div><label>Username: </label><span>Oktimmy</span></div>
        <div><label>Email Address: </label><span>oktimmy45@gmail.com</span></div>
      </div>

      <button className='edit-btn'>Edit Profile</button>
      <div>
        <h3>Some of your Works</h3>
        {/* <div></div> */}
        Here we will display some of the Author Previous works
      </div>
    </div>
  )
}

export default Profile