import React, { useState } from "react";
import "./Publish.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/Auth/authSlice";
import { useCreateBlogPostMutation } from "../../Redux/Blogs/blogApiSlice";
import { category } from "../../Utilities/Category";

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
  const [createBlogPost, ] =
    useCreateBlogPostMutation();

  const navigate = useNavigate();

  const author = `${user.firstName} ${user.secondName}`;
  const authorEmail = `${user.email}`;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState({ value: "All Categories" });
  const [excerpt, setExcerpt] = useState();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const changePostCategory = (newCategory) => {
    setPostCategory(newCategory);
  };

  const handleInput = async (e) => {
    let image = "";
    e.preventDefault();
    const post = {
      title,
      author,
      content,
      category: postCategory.value,
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
      if (postCategory.value === "All Categories") {
        alert("Please select a category");
        return;
      }

      const response = await createBlogPost({ ...post }).unwrap();

      if (response.statusCode === 200) {
        setTitle("");
        setPostCategory("");
        setContent("");
        setExcerpt("");
        setFile(null);
        navigate("/blog");
      }
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage("Title Already exists");
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="publish">
  //       <h2>Publish Your Article</h2>
  //       <div className="publish-form">
  //         <div className="nessage">Blog Post is Currently Uploading</div>
  //       </div>
  //     </div>
  //   );
  // }

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
              changePostCategory(category[e.target.value]);
            }}
          >
            {category.map((f) => {
              return (
                <option key={f.id} value={f.id - 1} id={f.id}>
                  {f.value}
                </option>
              );
            })}
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
            onChange={(e) => {
              setTitle(e.target.value);
              setErrorMessage("");
            }}
          />
          <p className="error__message">{errorMessage}</p>
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
