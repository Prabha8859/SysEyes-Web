import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, UserPlus, Camera, Edit3, X, Facebook, Instagram, Send } from 'lucide-react';
import c1 from '../../assets/images/profile/dp.png';
import c2 from '../../assets/images/profile/cover.jpg';
import g1 from '../../assets/images/group/01.jpg';
import g2 from '../../assets/images/group/02.jpg';
import g3 from '../../assets/images/group/03.jpg';
import g4 from '../../assets/images/group/04.jpg';
import g5 from '../../assets/images/group/05.jpg';
import m1 from '../../assets/images/member/01.jpg';
import m2 from '../../assets/images/member/02.jpg';
import m3 from '../../assets/images/member/03.jpg';
import m4 from '../../assets/images/member/04.jpg';
import m5 from '../../assets/images/member/05.jpg';
import m6 from '../../assets/images/member/06.jpg';
import m7 from '../../assets/images/member/07.jpg';
import m8 from '../../assets/images/member/08.jpg';
import m9 from '../../assets/images/member/09.jpg';
import m10 from '../../assets/images/member/10.jpg';
import m11 from '../../assets/images/member/11.jpg';
import m12 from '../../assets/images/member/12.jpg';
import w1 from '../../assets/images/widget/01.jpg';
import w2 from '../../assets/images/widget/02.jpg';
import w3 from '../../assets/images/widget/03.jpg';
import w4 from '../../assets/images/widget/04.jpg';
import w5 from '../../assets/images/widget/05.jpg';
import w6 from '../../assets/images/widget/06.jpg';
import w7 from '../../assets/images/widget/07.jpg';
import w8 from '../../assets/images/widget/08.jpg';
import w9 from '../../assets/images/widget/09.jpg';
import gm1 from '../../assets/images/group/group-mem/01.png';
import gm2 from '../../assets/images/group/group-mem/02.png';
import gm3 from '../../assets/images/group/group-mem/03.png';
import gm4 from '../../assets/images/group/group-mem/04.png';
import gm5 from '../../assets/images/group/group-mem/05.png';
import gm6 from '../../assets/images/group/group-mem/06.png';
import defaultAvatar from "../../assets/images/profile/Men-Avtar.jpg";
import { getFullImageUrl } from '../../assets/utils/getFullImageUrl';
import './ProfilePage.css';

// Constants
const IMG_BASE_URL = "https://chat.bitmaxtest.com/admin/public/uploads/";
const BASE_URL = "https://chat.bitmaxtest.com/admin/api";
const TOKEN = "getToken";

const ProfileHeader = ({ userData, onAddFriend, onPrivateMessage, onProfileImageChange, onCoverImageChange, profileImage, coverImage }) => {
  const profileFileInputRef = useRef(null);
  const coverFileInputRef = useRef(null);

  const handleProfileCameraClick = () => {
    profileFileInputRef.current.click();
  };

  const handleCoverEditClick = () => {
    coverFileInputRef.current.click();
  };

  return (
    <div className="profile-header-section">
      <div className="profile-cover-container">
        <img src={coverImage} alt={userData?.full_name || "profile cover"} className="cover-image" />
        <div className="cover-overlay"></div>
        
        <button className="edit-photo-btn" onClick={handleCoverEditClick}>
          <Camera size={20} />
          <span>Edit Photo</span>
        </button>
        <input
          type="file"
          ref={coverFileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onCoverImageChange}
        />

        <div className="profile-info-wrapper">
          <div className="profile-main-info">
            <div className="profile-avatar-container">
              <img src={profileImage} alt="Profile" className="profile-avatar-square" />
              <button className="avatar-edit-btn" onClick={handleProfileCameraClick}>
                <Camera size={16} />
              </button>
              <input
                type="file"
                ref={profileFileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={onProfileImageChange}
              />
            </div>
            
            <div className="profile-text-info">
              <h1 className="profile-name">{userData?.f_name || userData?.email}</h1>
              <p className="profile-status">Active 02 Minutes Ago</p>
            </div>
          </div>

          <div className="profile-action-buttons">
            <button onClick={onAddFriend} className="action-btn add-friend-btn">
              <UserPlus size={18} />
              <span>Add Friends</span>
            </button>
            
            <button onClick={onPrivateMessage} className="action-btn private-msg-btn">
              <MessageCircle size={18} />
              <span>Private Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Friends Popup Component
const AddFriendsPopup = ({ isOpen, onClose, userData }) => {
  const suggestedFriends = [
    { id: 1, name: "Jennifer Guido", image: m1, mutualFriends: "5 mutual friends" },
    { id: 2, name: "Andrea Guido", image: m2, mutualFriends: "3 mutual friends" },
    { id: 3, name: "Anna Hawk", image: m3, mutualFriends: "8 mutual friends" },
    { id: 4, name: "Andreas Adam", image: m4, mutualFriends: "2 mutual friends" },
    { id: 5, name: "Alaina T", image: m5, mutualFriends: "6 mutual friends" },
    { id: 6, name: "Aron Smith", image: m6, mutualFriends: "4 mutual friends" },
  ];

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Add Friends</h3>
          <button onClick={onClose} className="popup-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="suggested-friends-list">
          {suggestedFriends.map(friend => (
            <div key={friend.id} className="suggested-friend-item">
              <div className="friend-info">
                <img src={friend.image} alt={friend.name} className="friend-avatar" />
                <div>
                  <h4 className="friend-name">{friend.name}</h4>
                  <p className="mutual-friends">{friend.mutualFriends}</p>
                </div>
              </div>
              <button className="add-friend-btn">Add Friend</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Box Component
const ChatBox = ({ isOpen, onClose, userData }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How are you doing?", sender: "received", time: "2:30 PM" },
    { id: 2, text: "Hello! I'm doing great, thanks for asking. How about you?", sender: "sent", time: "2:32 PM" },
    { id: 3, text: "I'm doing well too. What are your plans for today?", sender: "received", time: "2:35 PM" },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "sent",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Auto reply after 2 seconds
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you soon.",
          sender: "received",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-user-info">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="chat-avatar" />
          <div>
            <h4 className="chat-username">{userData?.f_name || 'William Smith'}</h4>
            <p className="chat-status">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="chat-close-btn">
          <X size={18} />
        </button>
      </div>

      <div className="chat-messages">
        <div className="chat-message-container">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">
                <p>{msg.text}</p>
                <p className="message-time">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-send-btn">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityTab = ({ userData }) => {
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [filterOption, setFilterOption] = useState('Everything');

  // Mock filtering logic (since content is static, just set state)
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    // Here you can add logic to filter content based on 'Recently', 'Everything', 'Popular', 'Relevant'
    console.log('Selected filter:', e.target.value);
  };

  const renderPersonalContent = () => (
    <div className="activity-posts">
      {/* Post 1 */}
      <div className="activity-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">6 Minutes Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Quickly deliver going forward methods info create empowerment before client-centered bandwidth Credibly pontificate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 😍</span>
              <span className="like-text">Julia, Petrova and 306 like this</span>
            </div>
            <span className="post-comments-count">136 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post 2 - With Images */}
      <div className="activity-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">6 Minutes Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Quickly deliver going forward methods info create empowerment before client-centered bandwidth Credibly pontificate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
          
          <div className="post-images">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop" alt="Post" className="post-image" />
            <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop" alt="Post" className="post-image" />
          </div>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 😍</span>
              <span className="like-text">Julia, Petrova and 306 like this</span>
            </div>
            <span className="post-comments-count">136 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post 3 - Single Image */}
      <div className="activity-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">6 Minutes Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Quickly deliver going forward methods info create empowerment before client-centered bandwidth Credibly pontificate interoperable leadership skills ands B2B data awesome Continually whiteboard ands B2B data awesome Continually whiteboard</p>
          
          <div className="post-single-image">
            <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop" alt="Post" className="single-post-image" />
          </div>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 😍</span>
              <span className="like-text">Julia, Petrova and 306 like this</span>
            </div>
            <span className="post-comments-count">136 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <div className="load-more-container">
        <button className="load-more-btn">
          Load More Post
        </button>
      </div>
    </div>
  );

  const renderMentionsContent = () => (
    <div className="mentions-content">
      <div className="mentions-post">
        <div className="post-header">
          <img src={m2} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">Andrea Guido</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">1 Hour Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Had a great time with <span className="mention">@{userData?.f_name || 'William Smith'}</span> at the conference today! Looking forward to collaborating on future projects.</p>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️</span>
              <span className="like-text">You and 45 others like this</span>
            </div>
            <span className="post-comments-count">12 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mentions-post">
        <div className="post-header">
          <img src={m4} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">Andreas Adam</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">3 Hours Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Thanks to <span className="mention">@{userData?.f_name || 'William Smith'}</span> for the amazing advice on project management. Really appreciate your insights!</p>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 😊</span>
              <span className="like-text">You and 23 others like this</span>
            </div>
            <span className="post-comments-count">8 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="favorites-content">
      <div className="favorites-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">2 Days Ago</span>
            </div>
          </div>
          <div className="favorite-badge">
            <Heart size={16} className="favorite-icon" />
            <span>Favorite</span>
          </div>
        </div>
        
        <div className="post-content">
          <p>This is one of my favorite posts! Sharing some beautiful moments from my recent trip to the mountains. The sunset was absolutely breathtaking!</p>
          
          <div className="post-images">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Mountain sunset" className="post-image" />
            <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop" alt="Mountain view" className="post-image" />
          </div>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 😍 🔥</span>
              <span className="like-text">Sarah, Mike and 152 others like this</span>
            </div>
            <span className="post-comments-count">89 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn favorited">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="favorites-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">1 Week Ago</span>
            </div>
          </div>
          <div className="favorite-badge">
            <Heart size={16} className="favorite-icon" />
            <span>Favorite</span>
          </div>
        </div>
        
        <div className="post-content">
          <p>Another favorite memory! Celebrating success with the team after completing our biggest project this year. Couldn't be more proud of everyone involved!</p>
          
          <div className="post-single-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Team celebration" className="single-post-image" />
          </div>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 🎉 👏</span>
              <span className="like-text">Team members and 98 others like this</span>
            </div>
            <span className="post-comments-count">45 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn favorited">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="favorites-post">
        <div className="post-header">
          <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.f_name || 'William Smith'}</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">2 Weeks Ago</span>
            </div>
          </div>
          <div className="favorite-badge">
            <Heart size={16} className="favorite-icon" />
            <span>Favorite</span>
          </div>
        </div>
        
        <div className="post-content">
          <p>One of my all-time favorite quotes: "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill. This really resonates with my journey!</p>
        </div>

        <div className="post-engagement">
          <div className="post-stats">
            <div className="post-likes">
              <span className="like-reactions">👍 ❤️ 💪 🌟</span>
              <span className="like-text">Friends and 67 others like this</span>
            </div>
            <span className="post-comments-count">34 Comments</span>
          </div>

          <div className="post-actions">
            <button className="post-action-btn favorited">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="post-action-btn">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="post-action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'personal':
        return renderPersonalContent();
      case 'mentions':
        return renderMentionsContent();
      case 'favorites':
        return renderFavoritesContent();
      default:
        return renderPersonalContent();
    }
  };

  return (
    <div className="activity-tab-container">
      <div className="activity-content-wrapper">
        <div className="activity-main-content">
          {/* Activity Sub Navigation */}
          <div className="activity-sub-nav">
            <button 
              className={`sub-nav-btn ${activeSubTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('personal')}
            >
              Personal
            </button>
            <button 
              className={`sub-nav-btn ${activeSubTab === 'mentions' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('mentions')}
            >
              Mentions
            </button>
            <button 
              className={`sub-nav-btn ${activeSubTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('favorites')}
            >
              Favorites
            </button>
            <div className="dropdown-container">
              <select className="everything-dropdown" value={filterOption} onChange={handleFilterChange}>
                <option>Recently</option>
                <option>Everything</option>
                <option>Popular</option>
                <option>Relevant</option>
              </select>
            </div>
          </div>

          {/* Post Creation - Only show for personal tab */}
          {activeSubTab === 'personal' && (
            <div className="post-creation-card">
              <div className="post-creator">
                <img src={getFullImageUrl(userData?.image_url, c1)} alt="Profile" className="creator-avatar" />
                <div className="creator-content">
                  <div className="privacy-selector">
                    <span className="public-badge">Public</span>
                  </div>
                  <textarea 
                    placeholder="What's on your mind, William?"
                    className="post-textarea"
                    rows="3"
                  />
                  <div className="post-creation-actions">
                    <div className="post-options">
                      <button className="post-option">
                        <span>📝</span>
                        <span>Text</span>
                      </button>
                      <button className="post-option">
                        <Camera size={16} />
                        <span>Photo/Videos</span>
                      </button>
                      <button className="post-option">
                        <span>📎</span>
                        <span>Attach File</span>
                      </button>
                    </div>
                    <button className="post-submit-btn">POST</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub Tab Content */}
          {renderSubTabContent()}
        </div>

        {/* Activity Sidebar */}
        <div className="activity-sidebar">
          <SearchWidget />
          <YouMayLikeWidget />
          <JoinFriendsWidget />
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ userData }) => {
  return (
    <div className="profile-tab-container">
      <div className="profile-content-wrapper">
        <div className="profile-main-content">
          {/* Base Info Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Base Info</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{userData?.f_name || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">I'm a</span>
                  <span className="info-value">{userData?.gender || "Woman"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Looking for a</span>
                  <span className="info-value">{userData?.looking_for || "Men"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Marital Status</span>
                  <span className="info-value">{userData?.marital_status || "Single"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{userData?.age || "36"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date of Birth</span>
                  <span className="info-value">{userData?.dob || "27-02-1996"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value">{userData?.location || "Streep Rd, Peosur, Inphodux, USA"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Myself Summary Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Myself Summary</h6>
            </div>
            <div className="card-body">
              <p className="summary-text">
                Collaboratively innovate compelling mindshare after prospective partnerships Competently seize long-term high-impact internal or "organic" sources via user friendly strategic themener areas creat Dramatically coordinate premium partnerships rather than standards compliant items Dramatically matrix ethical collaboration and idea-sharing through opensource methodologies and Intrinsicly grow collaborative platforms vis-a-vis effective scenarios. Energistically strategize cost effective ideas before the worke unde.
              </p>
            </div>
          </div>

          {/* Looking For Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Looking For</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Things I'm looking for</span>
                  <span className="info-value">I want a funny person</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Whatever I like</span>
                  <span className="info-value">I like to travel a lot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lifestyle Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Lifestyle</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Interest</span>
                  <span className="info-value">Dogs,Cats</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Favorite vocations spot</span>
                  <span className="info-value">Maldives, Bangladesh</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Looking for</span>
                  <span className="info-value">Serious Relationship,Affair</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Smoking</span>
                  <span className="info-value">Casual Smoker</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Language</span>
                  <span className="info-value">English, French, Italian</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Info Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Physical info</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">5'9 ft</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Weight</span>
                  <span className="info-value">72 kg</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Hair Color</span>
                  <span className="info-value">Black</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Eye Color</span>
                  <span className="info-value">Brown</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Body Type</span>
                  <span className="info-value">Tall</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ethnicity</span>
                  <span className="info-value">Middle Eastern</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <SearchWidget />
          <YouMayLikeWidget />
        </div>
      </div>
    </div>
  );
};

const FriendsTab = ({ friends }) => {
  return (
    <div className="friends-tab-container">
      <div className="friends-content-wrapper">
        <div className="friends-main-content">
          <div className="friends-grid">
            {friends.map(friend => (
              <div key={friend.id} className="friend-card">
                <div className="friend-image-container">
                  <img src={friend.image} alt={friend.name} className="friend-image" />
                  <div className="friend-overlay">
                    <div className="social-icons">
                      <button className="social-icon facebook">
                        <Facebook size={18} />
                      </button>
                      <button className="social-icon instagram">
                        <Instagram size={18} />
                      </button>
                      <button className="social-icon chat">
                        <MessageCircle size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="friend-info">
                  <h6 className="friend-name">{friend.name}</h6>
                  <p className="friend-status">Active {friend.active}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="friends-sidebar">
          <SearchWidget />
          <YouMayLikeWidget />
        </div>
      </div>
    </div>
  );
};

const PhotosTab = ({ photos }) => {
  return (
    <div className="photos-tab-container">
      <div className="photos-header">
        <h2>All Uploaded Pictures</h2>
      </div>
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Photo ${index + 1}`} className="photo-image" />
          </div>
        ))}
      </div>
      <div className="load-more-container">
        <button className="load-more-btn">Load More</button>
      </div>
    </div>
  );
};

// Widget Components
const SearchWidget = () => {
  return (
    <div className="widget search-widget">
      <div className="widget-header">
        <h5>Filter Search Member</h5>
      </div>
      <div className="widget-content">
        <p className="widget-description">Serious Dating With TuruLav Your Perfect Match is Just a Click Away.</p>
        <form className="search-form">
          <select className="form-select">
            <option value="">I am a</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
          <select className="form-select">
            <option value="">Looking for</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="both">Both</option>
          </select>
          <div className="age-inputs">
            <select className="form-select">
              <option value="">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
            <select className="form-select">
              <option value="">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
            </select>
          </div>
          <select className="form-select">
            <option value="">Choose Your Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
          <select className="form-select">
            <option value="">Your Interests</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
          </select>
          <button type="button" className="find-partner-btn">Find Your Partner</button>
        </form>
      </div>
    </div>
  );
};

const YouMayLikeWidget = () => {
  const widgetImages = [w1, w2, w3, w4, w5, w6, w7, w8, w9];

  return (
    <div className="widget like-widget">
      <div className="widget-header">
        <h5>You May Like</h5>
      </div>
      <div className="widget-content">
        <div className="like-grid">
          {widgetImages.map((image, i) => (
            <div key={i} className="like-item">
              <img src={image} alt="potential match" />
              <Heart fill="red" color="red" size={20} className="heart-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JoinFriendsWidget = () => {
  return (
    <div className="widget group-widget">
      <div className="widget-header">
        <h5>Join The Friends</h5>
      </div>
      <div className="widget-content">
        <div className="group-item">
          <h6>Active Friends A1</h6>
          <p>Collaboratively fabricate best breed and applications through visionary</p>
          <div className="group-members">
            <div className="member-avatars">
              {[gm1, gm2, gm3, gm4, gm5, gm6].map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" />
              ))}
            </div>
            <span className="member-count">12+</span>
          </div>
          <button className="view-group-btn">View Friends</button>
        </div>

        <div className="group-item">
          <h6>Active Friends A2</h6>
          <p>Collaboratively fabricate best breed and applications through visionary</p>
          <div className="group-members">
            <div className="member-avatars">
              {[gm1, gm2, gm3, gm4, gm5, gm6].map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" />
              ))}
            </div>
            <span className="member-count">16+</span>
          </div>
          <button className="view-group-btn">View Friends</button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedData = location.state?.userData;

  const [activeTab, setActiveTab] = useState("activity");
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [profileImage, setProfileImage] = useState(getFullImageUrl(passedData?.image_url, c1));
  const [coverImage, setCoverImage] = useState(getFullImageUrl(passedData?.cover_image, c2));

  const userData = useMemo(() => {
    const safeImage = (img) => (img && img !== "null" ? img : defaultAvatar);

    return {
      ...passedData,
      friends: [
        { id: 1, name: "Jenifer Guido", image: safeImage(m1), active: "1 Day" },
        { id: 2, name: "Andrea Guido", image: safeImage(m2), active: "2 Day" },
        { id: 3, name: "Anna Hawk", image: safeImage(m3), active: "5 Day" },
        { id: 4, name: "Andreas Adam", image: safeImage(m4), active: "4 Day" },
        { id: 5, name: "Alaina T", image: safeImage(m5), active: "1 Day" },
        { id: 6, name: "Aron Smith", image: safeImage(m6), active: "3 Day" },
        { id: 7, name: "Helen Gomz", image: safeImage(m7), active: "3 Day" },
        { id: 8, name: "Andrez Jr", image: safeImage(m8), active: "5 Day" },
      ],
      photos: [
        safeImage(m1), safeImage(m2), safeImage(m3), safeImage(m4),
        safeImage(m5), safeImage(m6), safeImage(m7), safeImage(m8),
        safeImage(m9), safeImage(m10), safeImage(m11), safeImage(m12),
      ],
    };
  }, [passedData]);

  const handleAddFriend = () => setShowAddFriends(true);
  const handlePrivateMessage = () => setShowChat(true);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
      // Optionally, upload to server here
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setCoverImage(newImageUrl);
      // Optionally, upload to server here
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return <ActivityTab userData={userData} />;
      case 'profile':
        return <ProfileTab userData={userData} />;
      case 'friends':
        return <FriendsTab friends={userData.friends} />;
      case 'photos':
        return <PhotosTab photos={userData.photos} />;
      default:
        return <ActivityTab userData={userData} />;
    }
  };

  return (
    <div className="profile-page-container">
      {/* Profile Header */}
      <ProfileHeader 
        userData={userData} 
        onAddFriend={handleAddFriend}
        onPrivateMessage={handlePrivateMessage}
        onProfileImageChange={handleProfileImageChange}
        onCoverImageChange={handleCoverImageChange}
        profileImage={profileImage}
        coverImage={coverImage}
      />

      {/* Navigation Tabs */}
      <div className="profile-navigation">
        <div className="nav-container">
          <nav className="profile-nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
            <button
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`nav-tab ${activeTab === 'friends' ? 'active' : ''}`}
              onClick={() => setActiveTab('friends')}
            >
              Friends <span className="tab-count">{userData.friends?.length || 16}</span>
            </button>
            <button
              className={`nav-tab ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content-container">
        {renderTabContent()}
      </div>

      {/* Add Friends Popup */}
      <AddFriendsPopup 
        isOpen={showAddFriends} 
        onClose={() => setShowAddFriends(false)}
        userData={userData}
      />

      {/* Chat Box */}
      <ChatBox 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        userData={userData}
      />
    </div>
  );
};

export default ProfilePage;