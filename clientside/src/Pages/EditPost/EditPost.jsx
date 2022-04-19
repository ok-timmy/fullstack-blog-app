import React from 'react'
import "./EditPost.css"

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
              <textarea placeholder="Type your article content Here...." />
            </div>
    
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      );
}

export default EditPost