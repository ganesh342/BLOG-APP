import React,{useState,useEffect} from 'react'
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import blogImg1 from '../assets/images/blog1.jpg';
import blogImg2 from '../assets/images/blog2.jpg';
import blogImg3 from '../assets/images/blog3.jpg';
import blogImg4 from '../assets/images/blog4.jpg';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmarks from './Bookmarks';
import BlogsModal from "./BlogsModal";

const categories = ["general","world","technology","entertainment","sports","science","health","nation"];

const News = ({handleShowBlogs , blogs , onEditBlog, onDeleteBlog}) => {
  const [headline,setHeadline] = useState(null);
  const [news,setNews] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("general");
  const [searchInput,setSearchInput] = useState("");
  const [searchQuery,setSearchQuery] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [selectedArticle,setSelectedArticle] = useState(null);
  const [bookmarks,setBookmarks] = useState([]);
  const [showBookMarkModal,setShowBookMarkModal] = useState(false);
  const [selectedPost,setSelectedPost] = useState(null);
  const [showBlogModal,setShowBlogModal] = useState(false);

  useEffect(() => {
      const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=767b19657293d3c4137dc5a4370cd6b0`;
            

            if(searchQuery) {
              url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=767b19657293d3c4137dc5a4370cd6b0`;
            }

            const response = await axios.get(url);
            const fetchedNews = response.data.articles;


            fetchedNews.forEach((article) => {
              if(!article.image) {
                article.image = noImg
              }
            })

            setHeadline(fetchedNews[0]);
            setNews(fetchedNews.slice(1,7));
            
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

            setBookmarks(savedBookmarks);
            console.log(fetchedNews);
      }
      fetchNews();
  },[selectedCategory,searchQuery]);


  const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setSearchInput('');
  }


  const handleCategoryClick = (e,category) => {
    e.preventDefault();
    setSelectedCategory(category);
  }
  

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
    console.log(article);
  }
  

  const handleBookmarkClick = (article) => {
        setBookmarks((prev) => {
          const updatedBookmarks = prev.find((bookmark) => bookmark.title === article.title) ? prev.filter((bookmark) => bookmark.title !== article.title) : [...prev,article];
          localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
          return updatedBookmarks;
        })
  }

  const handleBlogClick = (blog) => {
       setSelectedPost(blog);
       setShowBlogModal(true);
  }
   
  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
  }

  return (
    <div className="news">
     <header className="news-header">
     <h1 className="logo">News & Blogs</h1>
     <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search News..."/>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
      </form>
     </div>
     </header>
     <div className="news-content">
        <div className="navbar">
            <div className="user" onClick={handleShowBlogs}>
              <img src={userImg} alt="User Image" />
              <p>Gani's Blog</p>
            </div>
            <div className="categories">
              <h1 className="nav-heading">Categories</h1>
              <div className="nav-links">
                {categories.map((category) => {
                  return (
                  <a href="#" key={category} className="nav-link" onClick={(e) => {handleCategoryClick(e,category)}}>{category}</a>
                  );
                })}
                <a href="#" className="nav-link" onClick={() => setShowBookMarkModal(true)}>Bookmarks <i className="fa-solid fa-bookmark"></i></a>
              </div>
            </div>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => handleArticleClick(headline)}>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title.length>100 ? `${headline.title.slice(0,100)}...`: headline.title}
                <i className={`${bookmarks.some((bookmark) => bookmark.title === headline.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark"`} onClick={(e) => {
                  e.stopPropagation()
                  handleBookmarkClick(headline);
                }}></i>
              </h2>
            </div>
                 )
          }
            <div className="news-grid">
              {news.map((article,index) => {
                return (
                <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                <img src={article.image || noImg} alt={article.title} />
                <h3>{article.title.length>82 ? `${article.title.slice(0,82)}...`: article.title} <i className={`${bookmarks.some((bookmark) => bookmark.title === article.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark"`} onClick={(e) => {
                  e.stopPropagation()
                  handleBookmarkClick(article);
                }}></i></h3>
              </div>
                );
              })}
            </div>
        </div>
        <NewsModal show={showModal} article={selectedArticle} onClose={() => setShowModal(false)} />
          <Bookmarks show={showBookMarkModal} bookmarks={bookmarks} onClose={() => setShowBookMarkModal(false)} onSelectArticle={handleArticleClick} onDeleteBookmark={handleBookmarkClick} />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs && blogs.map((blog,index) => {
              return (
              <div key={index} className="blog-post" onClick={() => handleBlogClick(blog)}>
              <img src={blog.image || noImg} alt={blog.title} />
                  <h3>{blog.title}</h3>
                  {/* <p>{blog.content.length>100 ? `${blog.content.slice(0,100)}...`: blog.content}</p> */}
                  <div className="post-buttons">
                    <div className="edit-post" onClick={() => onEditBlog(blog._id,blog)}>
                      <i className="bx bxs-edit"></i>
                    </div>
                    <div className="delete-post" onClick={(e) => 
                      {
                        e.stopPropagation();
                        onDeleteBlog(blog._id)
                      }}>
                      <i className="bx bxs-x-circle"></i>
                    </div>
                  </div>
            </div>
              );
            })}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal}/>
          )}
        </div>
        <div className="weather-calendar">
        <Weather/>
        <Calendar/>
        </div>
     </div>
     <footer className="news-footer">
      <p>
        <span>News & Blogs App</span>
      </p>
      <p>
        &copy; All Right Reserved. By Ganesh
      </p>
     </footer>
    </div>
  )
}

export default News
