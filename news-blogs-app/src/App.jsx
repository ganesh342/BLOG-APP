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
    const res = await axios.get('https://blog-app-ff1o.onrender.com/api/blogs/');
    console.log(res.data);
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
      try {
         setBlogs((prevBlogs) => {
     const updatedBlogs = isEdit
     ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) : [...prevBlogs,newBlog]
     return updatedBlogs;
    }); // Add newly created blog
        if(isEdit === false)
        {
    const res = await axios.post('https://blog-app-ff1o.onrender.com/api/blogs/', newBlog);
    console.log("added the blog with new id",res);
        }
        else 
        {
          const mainblog = blogs.find((blog) => (blog.title === newBlog.title));
          console.log("mainblog",mainblog);
          const res = await axios.put(`https://blog-app-ff1o.onrender.com/api/blogs/${mainblog._id}`, newBlog);
          console.log("updated the blog with id",mainblog);
        }
  } catch (error) {
    console.error('Create Blog Error:', error);
  }
  setSelectedPost(null);
  }

  const handleEditBlog = async (blogId,updatedBlog) => {
    setSelectedPost(updatedBlog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog._id === blogId ? updatedBlog : blog)));
  }

  const handleDeleteBlog = async (blogId) => {
    console.log("BLog deleted");
      try {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
     await axios.delete(`https://blog-app-ff1o.onrender.com/api/blogs/${blogId}`);
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

