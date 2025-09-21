import React, { useState, useRef, useMemo } from 'react';
import './ProfilePage.css';
import { 
  Camera, UserPlus, MessageCircle, X, Heart, Share2, Send, 
  Facebook, Instagram, Upload, FileText, Image, Paperclip
} from 'lucide-react';

import defaultimge from '../../assets/images/blog/01.jpg';
import defaultPhoto from '../../assets/images/footer/02.jpg';

// Mock data and images
const defaultAvatar = defaultPhoto;
const defaultCover = defaultimge;

const mockFriends = [
  { id: 1, name: "Jennifer Guido", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", active: "1 Day" },
  { id: 2, name: "Andrea Guido", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", active: "2 Day" },
  { id: 3, name: "Anna Hawk", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face", active: "5 Day" },
  { id: 4, name: "Andreas Adam", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", active: "4 Day" },
  { id: 5, name: "Alaina T", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face", active: "1 Day" },
  { id: 6, name: "Aron Smith", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", active: "3 Day" },
];

const mockPhotos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop",
];

const mockGroupMembers = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
];

// Profile Header Component
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
              <h1 className="profile-name">{userData?.f_name || userData?.name || 'William Smith'}</h1>
              <p className="profile-status">Active 2 Minutes Ago</p>
            </div>
          </div>

          <div className="profile-action-buttons">
            <button onClick={onAddFriend} className="action-btn add-friend-btn">
              <UserPlus size={18} />
              <span>Add Friend</span>
            </button>
            
            <button onClick={onPrivateMessage} className="action-btn private-msg-btn">
              <MessageCircle size={18} />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Friends Popup Component
const AddFriendsPopup = ({ isOpen, onClose }) => {
  const suggestedFriends = mockFriends.slice(0, 6).map(friend => ({
    ...friend,
    mutualFriends: `${Math.floor(Math.random() * 10) + 1} mutual friends`
  }));

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
          <img src={userData?.image || defaultAvatar} alt="Profile" className="chat-avatar" />
          <div>
            <h4 className="chat-username">{userData?.name || 'William Smith'}</h4>
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

// Activity Tab Component
const ActivityTab = ({ userData }) => {
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [filterOption, setFilterOption] = useState('Everything');
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Just finished an amazing project with the team! Feeling grateful for all the hard work and collaboration that made this possible. Excited to share the results soon! 🚀",
      author: userData?.name || 'William Smith',
      avatar: userData?.image || defaultAvatar,
      time: "6 Minutes Ago",
      likes: 306,
      comments: 136,
      images: []
    },
    {
      id: 2,
      text: "Beautiful sunset from my evening walk! Sometimes the simple moments are the most rewarding. Nature never fails to inspire creativity and peace of mind.",
      author: userData?.name || 'William Smith',
      avatar: userData?.image || defaultAvatar,
      time: "2 Hours Ago",
      likes: 178,
      comments: 89,
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop"
      ]
    }
  ]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    
    let filtered = [...posts];
    switch (value) {
      case 'Recently':
        filtered = posts.filter(post => post.time.includes('Minutes') || post.time.includes('Hour'));
        break;
      case 'Popular':
        filtered = posts.filter(post => post.likes > 200);
        break;
      case 'Relevant':
        filtered = posts.filter(post => post.author === userData?.name);
        break;
      default:
        filtered = posts;
    }
    setFilteredPosts(filtered);
  };

  const handlePostSubmit = () => {
    if (postText.trim()) {
      const newPost = {
        id: posts.length + 1,
        text: postText,
        author: userData?.name || 'William Smith',
        avatar: userData?.image || defaultAvatar,
        time: "Just now",
        likes: 0,
        comments: 0,
        images: []
      };
      
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
      setPostText('');
    }
  };

  const handleFileUpload = (type) => {
    if (type === 'photo') {
      photoInputRef.current?.click();
    } else if (type === 'file') {
      fileInputRef.current?.click();
    }
  };

  const renderPersonalContent = () => (
    <div className="activity-posts">
      {filteredPosts.map(post => (
        <div key={post.id} className="activity-post">
          <div className="post-header">
            <img src={post.avatar} alt="Profile" className="post-user-avatar" />
            <div className="post-user-info">
              <h4 className="post-username">{post.author}</h4>
              <div className="post-meta">
                <span className="post-privacy">Public</span>
                <span className="post-time">{post.time}</span>
              </div>
            </div>
          </div>
          
          <div className="post-content">
            <p>{post.text}</p>
            
            {post.images.length > 0 && (
              <div className={post.images.length > 1 ? "post-images" : "post-single-image"}>
                {post.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="Post" 
                    className={post.images.length > 1 ? "post-image" : "single-post-image"} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="post-engagement">
            <div className="post-stats">
              <div className="post-likes">
                <span className="like-reactions">👍 ❤️ 😍</span>
                <span className="like-text">You and {post.likes} others like this</span>
              </div>
              <span className="post-comments-count">{post.comments} Comments</span>
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
      ))}

      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <p>No posts found for the selected filter.</p>
        </div>
      )}

      {/* Load More Button */}
      <div className="load-more-container">
        <button className="load-more-btn">
          Load More Posts
        </button>
      </div>
    </div>
  );

  const renderMentionsContent = () => (
    <div className="mentions-content">
      <div className="activity-post">
        <div className="post-header">
          <img src={mockFriends[1].image} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">Andrea Guido</h4>
            <div className="post-meta">
              <span className="post-privacy">Public</span>
              <span className="post-time">1 Hour Ago</span>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          <p>Had a great time with <span className="mention">@{userData?.name || 'William Smith'}</span> at the conference today! Looking forward to collaborating on future projects.</p>
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
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="favorites-content">
      <div className="activity-post favorited">
        <div className="post-header">
          <img src={userData?.image || defaultAvatar} alt="Profile" className="post-user-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{userData?.name || 'William Smith'}</h4>
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
          <p>This is one of my favorite memories! Sharing some beautiful moments from my recent trip to the mountains. The sunset was absolutely breathtaking and reminded me why I love traveling.</p>
          
          <div className="post-single-image">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" alt="Mountain sunset" className="single-post-image" />
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
                <img src={userData?.image || defaultAvatar} alt="Profile" className="creator-avatar" />
                <div className="creator-content">
                  <div className="privacy-selector">
                    <span className="public-badge">Public</span>
                  </div>
                  <textarea 
                    placeholder="What's on your mind?"
                    className="post-textarea"
                    rows="3"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <div className="post-creation-actions">
                    <div className="post-options">
                      <button className="post-option" onClick={() => handleFileUpload('text')}>
                        <FileText size={16} />
                        <span>Text</span>
                      </button>
                      <button className="post-option" onClick={() => handleFileUpload('photo')}>
                        <Image size={16} />
                        <span>Photo</span>
                      </button>
                      <button className="post-option" onClick={() => handleFileUpload('file')}>
                        <Paperclip size={16} />
                        <span>File</span>
                      </button>
                    </div>
                    <button className="post-submit-btn" onClick={handlePostSubmit}>POST</button>
                  </div>
                </div>
              </div>
              
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={photoInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={(e) => console.log('Photos selected:', e.target.files)}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => console.log('File selected:', e.target.files[0])}
              />
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

// Profile Tab Component
const ProfileTab = ({ userData }) => {
  return (
    <div className="profile-tab-container">
      <div className="profile-content-wrapper">
        <div className="profile-main-content">
          {/* Base Info Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Basic Information</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{userData?.name || "William Smith"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{userData?.gender || "Male"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{userData?.age || "28"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{userData?.location || "New York, USA"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Joined</span>
                  <span className="info-value">January 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>About Me</h6>
            </div>
            <div className="card-body">
              <p className="summary-text">
                Passionate about technology, travel, and connecting with people from around the world. I love exploring new places, trying different cuisines, and sharing experiences with friends. Always looking for new adventures and opportunities to learn and grow.
              </p>
            </div>
          </div>

          {/* Interests Card */}
          <div className="profile-info-card">
            <div className="card-header">
              <h6>Interests & Hobbies</h6>
            </div>
            <div className="card-body">
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Hobbies</span>
                  <span className="info-value">Photography, Reading, Hiking</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Music</span>
                  <span className="info-value">Jazz, Rock, Electronic</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Movies</span>
                  <span className="info-value">Sci-Fi, Drama, Documentaries</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Languages</span>
                  <span className="info-value">English, Spanish, French</span>
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

// Friends Tab Component
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

// Photos Tab Component
const PhotosTab = ({ photos }) => {
  return (
    <div className="photos-tab-container">
      <div className="photos-header">
        <h2>Photo Gallery</h2>
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
        <h5>Find People</h5>
      </div>
      <div className="widget-content">
        <p className="widget-description">Connect with people who share your interests</p>
        <form className="search-form">
          <select className="form-select">
            <option value="">I am a</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select className="form-select">
            <option value="">Looking for</option>
            <option value="friends">Friends</option>
            <option value="networking">Networking</option>
            <option value="dating">Dating</option>
          </select>
          <div className="age-inputs">
            <select className="form-select">
              <option value="">Age from</option>
              <option value="18">18</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <select className="form-select">
              <option value="">Age to</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <select className="form-select">
            <option value="">Location</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
          <button type="button" className="find-partner-btn">Search</button>
        </form>
      </div>
    </div>
  );
};

const YouMayLikeWidget = () => {
  const suggestions = mockFriends.slice(0, 9);

  return (
    <div className="widget like-widget">
      <div className="widget-header">
        <h5>People You May Know</h5>
      </div>
      <div className="widget-content">
        <div className="like-grid">
          {suggestions.map((person, i) => (
            <div key={i} className="like-item">
              <img src={person.image} alt="suggestion" />
              <div className="like-overlay">
                <Heart size={20} className="heart-icon" />
              </div>
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
              {mockGroupMembers.map((avatar, i) => (
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
              {mockGroupMembers.map((avatar, i) => (
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

// Main Profile Page Component
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [coverImage, setCoverImage] = useState(defaultCover);

  const userData = useMemo(() => ({
    name: 'William Smith',
    f_name: 'William Smith',
    gender: 'Male',
    age: 28,
    location: 'New York, USA',
    image: defaultAvatar,
    friends: mockFriends,
    photos: mockPhotos,
  }), []);

  const handleAddFriend = () => setShowAddFriends(true);
  const handlePrivateMessage = () => setShowChat(true);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setCoverImage(newImageUrl);
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