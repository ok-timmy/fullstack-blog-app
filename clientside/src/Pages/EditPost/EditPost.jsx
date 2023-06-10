import React, { useState } from "react";
import "./EditPost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
// import axiosInstance from "../../config";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function EditPost({ blogContent,  setEditMode }) {
  const id = blogContent._id
  const [title, setTitle] = useState(blogContent.title);
  const [content, setContent] = useState(blogContent.content);
  const [category, setCategory] = useState(blogContent.category);

 const handlePostUpdate = async (e) => {
   e.preventDefault();
   const postUpdate = {id, content, category, title}
   console.log(postUpdate);

   try{
     const res = await axios.put('http://localhost:8000/api/post/update', postUpdate)
     console.log(res.data);
   }
   catch(error) {
     console.log(error);
   };

   setEditMode(false);
   
 }


  return (
    <div className="editpost">
      <h2>Edit Post</h2>
      <form className="editpost-form">
        <div>
          <label>Category</label>
          <select onChange={(e)=>setCategory(e.target.value)} defaultValue={category}>
            <option>Sport</option>
            <option>Romance</option>
            <option>Prose </option>
            <option>Poetry</option>
          </select>
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            className="post-img"
            accept=".png, .jpg, .jpeg .webp"
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            className="title"
            id="title"
            placeholder="Article Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Article Content</label>
          <ReactQuill
            className="quill"
            theme="snow"
            modules={modules}
            value={content}
            onChange={setContent}
            onKeyUp={console.log(content)}
            placeholder="Content goes here..."
          />
        </div>

        <button type="submit" onClick={handlePostUpdate}  className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
