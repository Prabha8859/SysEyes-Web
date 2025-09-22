import React from 'react';
import { FaPhoneAlt, FaCommentDots, FaVideo, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user, onChatClick, onRequest, onShowAlert }) => {
  return (
    <div className="user-card">
      <div className="user-image">
        <img src={user.image} alt={user.name} loading="lazy "  onClick={() => onViewProfile(user)} />
        <div className="hover-overlay">
          <Link to="/view-profile" className="more-link">
            View Profile
          </Link>
        </div>
      </div>
      
      <div className="user-info">
        <button
          className={`send-btn ${user.requested ? 'sent' : ''}`}
          onClick={() => onRequest(user.id)}
          aria-label={user.requested ? 'Cancel request' : 'Send friend request'}
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
            <span className="online-dot" aria-label="Online"></span>
          </div>
        ) : (
          <h4 className="offline-status">{user.name}</h4>
        )}

        <p className="user-age">{user.age}</p>
        
        <div className="btn-group">
          <button 
            className="chat-btn" 
            onClick={() => onShowAlert('Audio')}
            aria-label="Make audio call"
            title="Audio Call"
          >
            <FaPhoneAlt />
          </button>
          <button 
            className="chat-btn" 
            onClick={() => onChatClick(user)}
            aria-label="Start chat"
            title="Start Chat"
          >
            <FaCommentDots />
          </button>
          <button 
            className="chat-btn" 
            onClick={() => onShowAlert('Video')}
            aria-label="Make video call"
            title="Video Call"
          >
            <FaVideo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;