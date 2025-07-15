import React from 'react';
import './Modal.css';
import noImg from "../assets/images/no-img.png";
import './Bookmarks.css';

const Bookmarks = ({show, bookmarks, onClose, onSelectArticle, onDeleteBookmark, }) => {
    if(!show){
        return null;
    }
  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="bookmarks-heading">Bookmarked News</h2>
        <div className="bookmarks-list">
        {bookmarks.map((bookmark,index) => {
            return (
            <div key={index} className="bookmark-item" onClick={() => onSelectArticle(bookmark)}>
            <img src={bookmark.image || noImg} alt={bookmark.title} />
            <h3>{bookmark.title}</h3>
            <span className="delete-button" onClick={(e) => {
              e.stopPropagation();
              onDeleteBookmark(bookmark);
            }}><i className="fa-regular fa-circle-xmark"></i></span>
        </div>
            );
        })}
        </div>
      </div>
    </div>
  )
}

export default Bookmarks
