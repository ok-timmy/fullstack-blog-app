import React, { useState } from "react";
import "./publish.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const  modules  = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
};



function Publish() {
  const [value, setValue] = useState("");
  console.log(value)

  // setValue()
  return (
    <div className="publish">
      <h2>Publish Your Article</h2>
      <form className="publish-form">
        <div>
          <label>Author</label>
          <input
            type="text"
            className="author"
            id="author"
            value={"Timilehin Okunola"}
          />
        </div>
        <div className="category">
          <label>Category</label>
          <select>
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
          />
        </div>
        <div>
          <label>Article Content</label>
          <ReactQuill className="quill" theme="snow" onChange={setValue} modules={modules} placeholder="Content goes here..."/>
        </div>

        <button type="submit" className="submit-btn">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Publish;
