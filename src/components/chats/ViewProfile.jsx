import React, { useState, useRef, useMemo } from 'react';
import './ViewProfile.css';
import { 
  Camera, UserPlus, MessageCircle, X, Heart, Share2, Send, 
  Facebook, Instagram, Upload, FileText, Image, Paperclip,
  MapPin, Calendar, Briefcase, GraduationCap, Users, Gift,
  Shield, Star, Eye, Phone, Video, UserX, Flag, Bookmark,
  ThumbsUp, ThumbsDown, Clock, Check
} from 'lucide-react';

// Mock data for the user profile being viewed
const profileData = {
  id: 1,
  name: 'Sarah Johnson',
  age: 26,
  location: 'Mumbai, Maharashtra',
  profession: 'Software Engineer at Google',
  education: 'IIT Delhi - Computer Science',
  distance: '2.5 km away',
  lastActive: '2 hours ago',
  verified: true,
  premium: true,
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  about: 'Travel enthusiast, foodie, and tech lover. Looking for meaningful connections and shared adventures. Love hiking, trying new cuisines, and deep conversations over coffee.',
  interests: ['Travel', 'Photography', 'Hiking', 'Cooking', 'Reading', 'Music', 'Fitness', 'Movies'],
  photos: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop'
  ],
  lifestyle: {
    smoking: 'Never',
    drinking: 'Socially',
    exercise: 'Regularly',
    diet: 'Vegetarian',
    pets: 'Love dogs',
    kids: 'Want someday'
  },
  languages: ['Hindi', 'English', 'French'],
  relationshipGoal: 'Long-term relationship',
  height: '5\'6"',
  zodiac: 'Virgo',
  matchPercentage: 87
};

const ViewProfile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [showChat, setShowChat] = useState(false);
  const [friendStatus, setFriendStatus] = useState('none'); // none, pending, added, blocked
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [userAction, setUserAction] = useState(null); // 'like', 'pass', null

  // Handle friend request
  const handleAddFriend = () => {
    if (friendStatus === 'none') {
      setFriendStatus('pending');
    } else if (friendStatus === 'pending') {
      setFriendStatus('added');
    }
  };

  // Handle like/pass actions
  const handleLike = () => {
    setUserAction('like');
    // In real app, this would send to backend
  };

  const handlePass = () => {
    setUserAction('pass');
    // In real app, this would send to backend
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleBlock = () => {
    setFriendStatus('blocked');
  };

  // Profile Header Component
  const ProfileHeader = () => (
    <div className="profile-header">
      <div className="cover-container">
        <img src={profileData.coverImage} alt="Cover" className="cover-image" />
        <div className="cover-overlay"></div>
        
        {/* Back button and actions */}
        <div className="header-actions">
          <button className="back-btn" onClick={() => window.history.back()}>
            <X size={20} />
          </button>
          <div className="profile-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark size={18} fill={isBookmarked ? '#ec4899' : 'none'} />
            </button>
            <button className="report-btn" onClick={() => setShowReportModal(true)}>
              <Flag size={18} />
            </button>
          </div>
        </div>

        {/* Main profile info */}
        <div className="profile-main-info">
          <div className="avatar-container">
            <img src={profileData.avatar} alt="Profile" className="profile-avatar" />
            {profileData.verified && (
              <div className="verified-badge">
                <Shield size={16} />
              </div>
            )}
            {profileData.premium && (
              <div className="premium-badge">
                <Star size={16} />
              </div>
            )}
          </div>
          
          <div className="profile-info">
            <div className="name-section">
              <h1 className="profile-name">{profileData.name}, {profileData.age}</h1>
              <div className="match-percentage">
                <Heart size={16} />
                <span>{profileData.matchPercentage}% Match</span>
              </div>
            </div>
            
            <div className="location-info">
              <MapPin size={16} />
              <span>{profileData.distance}</span>
              <Clock size={16} />
              <span>Active {profileData.lastActive}</span>
            </div>

            <div className="quick-info">
              <div className="info-chip">
                <Briefcase size={14} />
                <span>Software Engineer</span>
              </div>
              <div className="info-chip">
                <GraduationCap size={14} />
                <span>IIT Delhi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="main-actions">
          <button 
            className={`action-btn pass-btn ${userAction === 'pass' ? 'active' : ''}`}
            onClick={handlePass}
          >
            <X size={20} />
          </button>
          
          <button className="action-btn message-btn" onClick={() => setShowChat(true)}>
            <MessageCircle size={20} />
          </button>
          
          <button 
            className={`action-btn like-btn ${userAction === 'like' ? 'active' : ''}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={userAction === 'like' ? '#fff' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );

  // Navigation tabs
  const NavigationTabs = () => (
    <div className="navigation-tabs">
      <button 
        className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`}
        onClick={() => setActiveTab('about')}
      >
        About
      </button>
      <button 
        className={`nav-tab ${activeTab === 'photos' ? 'active' : ''}`}
        onClick={() => setActiveTab('photos')}
      >
        Photos ({profileData.photos.length})
      </button>
      <button 
        className={`nav-tab ${activeTab === 'interests' ? 'active' : ''}`}
        onClick={() => setActiveTab('interests')}
      >
        Interests
      </button>
      <button 
        className={`nav-tab ${activeTab === 'lifestyle' ? 'active' : ''}`}
        onClick={() => setActiveTab('lifestyle')}
      >
        Lifestyle
      </button>
    </div>
  );

  // About Tab
  const AboutTab = () => (
    <div className="tab-content about-tab">
      <div className="info-cards">
        <div className="info-card">
          <h3>About Me</h3>
          <p>{profileData.about}</p>
        </div>

        <div className="info-card">
          <h3>Basic Info</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Age</span>
              <span className="value">{profileData.age}</span>
            </div>
            <div className="info-item">
              <span className="label">Height</span>
              <span className="value">{profileData.height}</span>
            </div>
            <div className="info-item">
              <span className="label">Location</span>
              <span className="value">{profileData.location}</span>
            </div>
            <div className="info-item">
              <span className="label">Zodiac</span>
              <span className="value">{profileData.zodiac}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Work & Education</h3>
          <div className="work-education">
            <div className="work-item">
              <Briefcase size={18} />
              <div>
                <div className="title">Software Engineer</div>
                <div className="company">Google</div>
              </div>
            </div>
            <div className="work-item">
              <GraduationCap size={18} />
              <div>
                <div className="title">Computer Science</div>
                <div className="company">IIT Delhi</div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Languages</h3>
          <div className="languages">
            {profileData.languages.map((lang, index) => (
              <span key={index} className="language-chip">{lang}</span>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h3>What I'm Looking For</h3>
          <p>{profileData.relationshipGoal}</p>
        </div>
      </div>
    </div>
  );

  // Photos Tab
  const PhotosTab = () => (
    <div className="tab-content photos-tab">
      <div className="photos-grid">
        {profileData.photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-item"
            onClick={() => {
              setCurrentPhotoIndex(index);
              setShowPhotoModal(true);
            }}
          >
            <img src={photo} alt={`Photo ${index + 1}`} />
            <div className="photo-overlay">
              <Eye size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Interests Tab
  const InterestsTab = () => (
    <div className="tab-content interests-tab">
      <div className="info-card">
        <h3>Interests & Hobbies</h3>
        <div className="interests-grid">
          {profileData.interests.map((interest, index) => (
            <div key={index} className="interest-chip">
              {interest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Lifestyle Tab
  const LifestyleTab = () => (
    <div className="tab-content lifestyle-tab">
      <div className="info-card">
        <h3>Lifestyle</h3>
        <div className="lifestyle-grid">
          <div className="lifestyle-item">
            <span className="label">Smoking</span>
            <span className="value">{profileData.lifestyle.smoking}</span>
          </div>
          <div className="lifestyle-item">
            <span className="label">Drinking</span>
            <span className="value">{profileData.lifestyle.drinking}</span>
          </div>
          <div className="lifestyle-item">
            <span className="label">Exercise</span>
            <span className="value">{profileData.lifestyle.exercise}</span>
          </div>
          <div className="lifestyle-item">
            <span className="label">Diet</span>
            <span className="value">{profileData.lifestyle.diet}</span>
          </div>
          <div className="lifestyle-item">
            <span className="label">Pets</span>
            <span className="value">{profileData.lifestyle.pets}</span>
          </div>
          <div className="lifestyle-item">
            <span className="label">Kids</span>
            <span className="value">{profileData.lifestyle.kids}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Chat Modal
  const ChatModal = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
      { id: 1, text: "Hi! I saw your profile and would love to get to know you better!", sender: "sent", time: "2:30 PM" }
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
      }
    };

    if (!showChat) return null;

    return (
      <div className="chat-modal">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-user-info">
              <img src={profileData.avatar} alt="Profile" className="chat-avatar" />
              <div>
                <h4>{profileData.name}</h4>
                <p>Online</p>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="chat-close">
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Photo Modal
  const PhotoModal = () => {
    if (!showPhotoModal) return null;

    return (
      <div className="photo-modal" onClick={() => setShowPhotoModal(false)}>
        <div className="photo-modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowPhotoModal(false)}>
            <X size={24} />
          </button>
          <img src={profileData.photos[currentPhotoIndex]} alt="Full size" />
          <div className="photo-navigation">
            <button 
              onClick={() => setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))}
              disabled={currentPhotoIndex === 0}
            >
              ←
            </button>
            <span>{currentPhotoIndex + 1} / {profileData.photos.length}</span>
            <button 
              onClick={() => setCurrentPhotoIndex(Math.min(profileData.photos.length - 1, currentPhotoIndex + 1))}
              disabled={currentPhotoIndex === profileData.photos.length - 1}
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Report Modal
  const ReportModal = () => {
    if (!showReportModal) return null;

    return (
      <div className="report-modal" onClick={() => setShowReportModal(false)}>
        <div className="report-modal-content" onClick={e => e.stopPropagation()}>
          <h3>Report Profile</h3>
          <p>Why are you reporting this profile?</p>
          <div className="report-options">
            <button>Fake profile</button>
            <button>Inappropriate photos</button>
            <button>Harassment</button>
            <button>Spam</button>
            <button>Other</button>
          </div>
          <div className="report-actions">
            <button onClick={() => setShowReportModal(false)}>Cancel</button>
            <button className="report-submit">Submit Report</button>
          </div>
        </div>
      </div>
    );
  };

  // Render current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about': return <AboutTab />;
      case 'photos': return <PhotosTab />;
      case 'interests': return <InterestsTab />;
      case 'lifestyle': return <LifestyleTab />;
      default: return <AboutTab />;
    }
  };

  return (
    <div className="view-profile">
      <ProfileHeader />
      <NavigationTabs />
      <div className="content-container">
        {renderTabContent()}
      </div>
      
      {/* Fixed bottom action bar for mobile */}
      <div className="bottom-actions">
        <button 
          className={`bottom-action pass ${userAction === 'pass' ? 'active' : ''}`}
          onClick={handlePass}
        >
          <X size={24} />
          <span>Pass</span>
        </button>
        
        <button 
          className={`bottom-action add-friend ${friendStatus !== 'none' ? 'added' : ''}`}
          onClick={handleAddFriend}
        >
          {friendStatus === 'added' ? <Check size={24} /> : <UserPlus size={24} />}
          <span>{friendStatus === 'added' ? 'Added' : friendStatus === 'pending' ? 'Pending' : 'Add'}</span>
        </button>
        
        <button className="bottom-action message" onClick={() => setShowChat(true)}>
          <MessageCircle size={24} />
          <span>Message</span>
        </button>
        
        <button 
          className={`bottom-action like ${userAction === 'like' ? 'active' : ''}`}
          onClick={handleLike}
        >
          <Heart size={24} fill={userAction === 'like' ? '#fff' : 'none'} />
          <span>Like</span>
        </button>
      </div>

      <ChatModal />
      <PhotoModal />
      <ReportModal />
    </div>
  );
};

export default ViewProfile;