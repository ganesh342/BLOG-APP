import React from 'react';
import demoImg from "../assets/images/demo.jpg";

const BlogsModal = ({show,blog,onClose}) => {
    if(!show) {
        return null;
    }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        {blog && (
            <>
             <img src={blog.image} alt={blog.title} className="modal-image"/>
        <h2 className="modal-title">{blog.title}</h2>
        {/* <p className="modal-source">Source: {article.source.name}</p> */}
        {/* <p className="modal-date">
            {new Date(article.publishedAt).toLocaleString('en-US', {
            month:'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute:'2-digit',
        })}</p> */}
        <p className="modal-content-text">{blog.content}</p>
        {/* <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">Read More</a> */}
            </>
        )}
      </div>
    </div>
  )
}

export default BlogsModal