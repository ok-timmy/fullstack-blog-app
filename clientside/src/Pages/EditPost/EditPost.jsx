import React from 'react'
import "./EditPost.css"
import ReactQuill from 'react-quill';
import 'quilljs/dist/quill.snow.css';



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


function EditPost() {
  return (
        <div className="editpost">
            <h2>Edit Post</h2>
          <form className="editpost-form">
            <div>
              <label>Author</label>
              <input
                type="text"
                className="author"
                id="author"
                value="Timilehin Okunola"
              />
            </div>
            <div>
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
              <ReactQuill className="quill" theme="snow" modules={modules} placeholder="Content goes here..."/>
            </div>
    
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      );
}

export default EditPost