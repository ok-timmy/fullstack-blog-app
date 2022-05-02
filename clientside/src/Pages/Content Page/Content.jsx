import React, { useContext, useState } from "react";
import "./Content.css";
import imagetwo from "../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp";
import { useLocation } from "react-router-dom";
import { Context } from "../../Context/Context";
import EditPost from "../EditPost/EditPost";

function Content() {
  const [editMode, setEditMode] = useState(false)
  const {user} = useContext(Context);
  const location = useLocation();
  const { blogContent } = location.state;

  console.log(blogContent);

  if(editMode){
return <EditPost blogContent={blogContent} setEditMode={setEditMode} />
    
  }

  else return (
    <div className="content">
      <div className="content-image">
        <img src={imagetwo} alt="Content emblem" />
      </div>
      <div className="space">
        <div className="content-details">
          <p className="content-category">{blogContent.category}</p>
          <p className="content-author">Published by {blogContent.author}</p>
          <p className="content-timestamp">Published 3 days ago</p>
        </div>
        { user ? (blogContent.author === `${user.firstName} ${user.secondName}`) &&
        <div>
          <i onClick={()=>setEditMode(true)} className="bi bi-pencil"></i>

          <i className="bi bi-trash"></i>
        </div> : <div></div>
}
      </div>
      <div
        className="content-story"
        dangerouslySetInnerHTML={{ __html: blogContent.content }}
      ></div>
    </div>
  );
}

export default Content;
