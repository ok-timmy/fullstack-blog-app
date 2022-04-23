import React, { useState } from "react";
import "./publish.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";



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
const navigation = useNavigate();


  const [error, setError] = useState(false)
  const [author, setValue] = useState("Okunola Timilehin");
  const [title, setTitle]= useState("")
  const [content, setContent]= useState("")
  const [category, setCategory]= useState()
  const [excerpt, setExcerpt]= useState()
  // console.log(value)

  const handleInput = async(e) => {
    e.preventDefault();
    const post = { title, author, content, category, excerpt };
    console.log(post);
try{
    const res = await axios.post("http://localhost:8000/api/post/", post)
  console.log(res.data);
}
catch(error) {
  console.log(error.message);
  setError(true);
};

setTitle("");
setContent("");
setCategory("");
setExcerpt("");

navigation('/blogs')
  };

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
            value={author}
            
          />
        </div>
        <div className="category">
          <label>Category</label>
          <select onChange={(e)=> {setCategory(e.target.value); console.log(category)}}>
            <option value={'Sport'}>Sport</option>
            <option value={'Romance'}>Romance</option>
            <option value={'Prose'}>Prose </option>
            <option value={'Poetry'}>Poetry</option>
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
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Excerpts</label>
          <input
            type="text"
            className="title"
            id="title"
            placeholder="Article Excerpts"
            onChange={(e)=>setExcerpt(e.target.value)}
          />
        </div>
        <div>
          <label>Article Content</label>
          <ReactQuill className="quill" theme="snow" onChange={setContent} modules={modules} placeholder="Content goes here..."/>
        </div>

        <button type="submit" onClick={ handleInput} className="submit-btn">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Publish;
