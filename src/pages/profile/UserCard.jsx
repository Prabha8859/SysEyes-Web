import React from 'react';
import { FaPhoneAlt, FaCommentDots, FaVideo, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './UserCard.css';
const UserCard = ({ user, onChatClick, onRequest, onShowAlert }) => {
  return (
    <div className="user-card">
      <div className="user-image">
        <img src={user.image} alt={user.name} />
        <div className="hover-overlay">
          <Link to="#" className="more-link">
            More
          </Link>
        </div>
      </div>
      <div className="user-info">
        <button
          className={`send-btn ${user.requested ? 'sent' : ''}`}
          onClick={() => onRequest(user.id)}
        >
          {user.requested ? (
            <>
              <FaCheck className="check-icon" /> Request Sent
            </>
          ) : (
            'Send Request'
          )}
        </button>

        {user.online ? (
          <div className="name-container">
            <h4>{user.name}</h4>
            <span className="online-dot"></span>
          </div>
        ) : (
          <h4 className="offline-status">{user.name}</h4>
        )}

        <p>{user.age}</p>
        <div className="btn-group">
          <button className="chat-btn" onClick={() => onShowAlert('Audio')}>
            <FaPhoneAlt />
          </button>
          <button className="chat-btn" onClick={() => onChatClick(user)}>
            <FaCommentDots />
          </button>
          <button className="chat-btn" onClick={() => onShowAlert('Video')}>
            <FaVideo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;