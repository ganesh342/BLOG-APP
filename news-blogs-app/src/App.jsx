import React,{useState,useEffect} from 'react'
import News from "./Components/News";
import Blogs from "./Components/Blogs";
import axios from 'axios'
const App = () => {
  const [showBlogs, setShowBlogs] = useState(false);
  const [showNews, setShowNews] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost,setSelectedPost] = useState(null);
  const [isEditing,setIsEditing] = useState(false);
  

  const fetchBlogs = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/blogs/');
    setBlogs(res.data);
  } catch (error) {
    console.error('Fetch Blogs Error:', error);
  }
};

useEffect(() => {
  fetchBlogs();
}, []);

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  }

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
    setIsEditing(false);
    setSelectedPost(null);
  }

  const handleCreateBlog = async (newBlog,isEdit) => {
     setIsEditing(false);
  setSelectedPost(null);
      try {
        if(isEdit === false)
        {
    const res = await axios.post('http://localhost:5000/api/blogs/', newBlog);
        }
    setBlogs((prevBlogs) => {
     const updatedBlogs = isEdit
     ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) : [...prevBlogs,newBlog]
     return updatedBlogs;
    }); // Add newly created blog
  } catch (error) {
    console.error('Create Blog Error:', error);
  }
  }

  const handleEditBlog = async (blogId,updatedBlog) => {
    setSelectedPost(updatedBlog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
      try {
    const res = await axios.put(`http://localhost:5000/api/blogs/${blogId}`, updatedBlog);
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog._id === blogId ? updatedBlog : blog))
    );
  } catch (error) {
    console.error('Edit Blog Error:', error);
  }
  }

  const handleDeleteBlog = async (blogId) => {
    console.log("BLog deleted");
      try {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
     await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
  } catch (error) {
    console.error('Delete Blog Error:', error);
  }
  }

  return (
    <div className='container'>
      <div className="news-blog-app">
        {showNews &&
      <News handleShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog}/>}
        {showBlogs &&
      <Blogs handleBackToNews={handleBackToNews} onCreateBlog={handleCreateBlog} editPost={selectedPost} isEditing={isEditing}/>}
      </div>
    </div>
  )
}

export default App

