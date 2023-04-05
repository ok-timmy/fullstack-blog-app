import React, { useState } from "react";
import "./Publish.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { useCreateBlogPostMutation } from "../../Redux/Blogs/blogApiSlice";

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
    ["link"],
    ["clean"],
  ],
};

function Publish() {
  const user = useSelector(setCurrentUser);
  const [createBlogPost, { isLoading, isError, error }] =
    useCreateBlogPostMutation();

  const navigate = useNavigate();

  const author = `${user.firstName} ${user.secondName}`;
  const authorEmail = `${user.email}`;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState();
  const [excerpt, setExcerpt] = useState();
  const [file, setFile] = useState(null);

  const handleInput = async (e) => {
    let image = "";
    e.preventDefault();
    const post = {
      title,
      author,
      content,
      category,
      excerpt,
      file,
      image,
      authorEmail,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      post.image = fileName;
    }

    try {
      if (category === "") {
        alert("Please select a category");
        return;
      }

      await createBlogPost({ ...post }).unwrap();
      setTitle("");
      setCategory("");
      setContent("");
      setExcerpt("");
      setFile(null);

      navigate("/blog");
    } catch (err) {
      console.log(err);
      console.log(isError);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="publish">
        <h2>Publish Your Article</h2>
        <div className="publish-form">
          <div className="nessage">Blog Post is Currently Uploading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="publish">
      <h2>Publish Your Article</h2>
      <form className="publish-form">
        {file && (
          <div className="post-image-div">
            <img
              src={URL.createObjectURL(file)}
              alt={"FileImg"}
              className="post-image"
            />
          </div>
        )}
        <div className="category">
          <label>Category</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
          >
            <option value={""}></option>
            <option value={"Sport"}>Sport</option>
            <option value={"Romance"}>Romance</option>
            <option value={"Prose"}>Prose </option>
            <option value={"Poetry"}>Poetry</option>
          </select>
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            className="post-img"
            accept=".png, .jpg, .jpeg .webp"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            className="title"
            id="title"
            placeholder="Article Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Excerpts</label>
          <input
            type="text"
            className="title"
            id="title"
            placeholder="Article Excerpts"
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>
        <div>
          <label>Article Content</label>
          <ReactQuill
            className="quill"
            theme="snow"
            onChange={setContent}
            modules={modules}
            placeholder="Content goes here..."
          />
        </div>

        <button type="submit" onClick={handleInput} className="submit-btn">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Publish;
