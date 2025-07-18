import React,{useState,useEffect} from 'react'
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import "./Blogs.css";


const Blogs = ({handleBackToNews , onCreateBlog, editPost, isEditing}) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  
  useEffect(() => {
      if(isEditing && editPost) {
        setImage(editPost.image);
        setTitle(editPost.title);
        setContent(editPost.content);
        setShowForm(true);
      }
      else 
      {
         setImage(null);
        setTitle("");
        setContent("");
        setShowForm(false);
      }
  },[isEditing,editPost]);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1*1024*1024;
      if(file.size>maxSize)
      {
        alert("File size exceeds 1 MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  
  const handleTitleChange = (e) => {
    const value = e.target.value;
    
    if (value.length > 50) {
      setTitleValid(false);
    } else {
      setTitle(value);
      setTitleValid(true);
    }
  }

  const handleContentChange = (e) => {
    const value = e.target.value;
      setContent(value);
      setContentValid(true);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newBlog = {
        title,
        content,
        image: image|| noImg,
      };
      onCreateBlog(newBlog,isEditing);
      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        handleBackToNews();
      }, 3000); // Reset the submitted state after 3 seconds

    } else {
      if(!title) {
        setTitleValid(false);
      }
      if(!content) {
        setContentValid(false);
      }
      return;
    }
  }


  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (<button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>)}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handleSubmit}> 
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i> Upload Image
              </label>
              <input type="file" id="file-upload" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder="Add Title (Max 50 characters)" className={`title-input ${!titleValid ? 'invalid' : ''}`} value={title} onChange={handleTitleChange} maxLength={60}/>
            <textarea className={`text-input ${!contentValid ? 'invalid' : ''}`} placeholder="Add Text" value={content} onChange={handleContentChange} ></textarea>
            <button type="submit" className="submit-btn">{isEditing ? "Update Post" : "Submit Post"}</button>
          </form>
          </div>
        {/* <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button> */}
        <button className="blogs-close-btn" onClick={handleBackToNews}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Blogs
