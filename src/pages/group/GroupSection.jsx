import React, { useState } from 'react';

// Sample images - replace with your actual imports
import img1 from '../../assets/images/group/01.jpg';
import img2 from '../../assets/images/group/02.jpg';
import img3 from '../../assets/images/group/03.jpg';
import img4 from '../../assets/images/group/04.jpg';

import mem1 from '../../assets/images/group/group-mem/01.png';
import mem2 from '../../assets/images/group/group-mem/01.png';
import mem3 from '../../assets/images/group/group-mem/01.png';
import mem4 from '../../assets/images/group/group-mem/01.png';
import mem5 from '../../assets/images/group/group-mem/01.png';
import mem6 from '../../assets/images/group/group-mem/06.png';

const memberImgs = [mem1, mem2, mem3, mem4, mem5, mem6];
const token = localStorage.getItem("token");
const isLogin = !!token;

const groups = [
  {
    id: 1,
    title: "💬 Flirty Vibes",
    description: "Where playful hearts meet & sweet convos begin. Join and vibe with singles worldwide!",
    image: img1,
    members: 12,
    category: "Dating",
    isActive: true,
    onlineMembers: 8,
    newMessages: 5,
    color: "#ff6b6b"
  },
  {
    id: 2,
    title: "🌍 Global Crushes", 
    description: "From Mumbai to Madrid – find flirty friends & fun convos from around the world!",
    image: img2,
    members: 15,
    category: "International",
    isActive: true,
    onlineMembers: 12,
    newMessages: 3,
    color: "#4ecdc4"
  },
  {
    id: 3,
    title: "🎶 Music & Match",
    description: "Share your favorite romantic tracks & find your rhythm with like-minded singles!",
    image: img3,
    members: 8,
    category: "Music",
    isActive: false,
    onlineMembers: 0,
    newMessages: 0,
    color: "#45b7d1"
  },
  {
    id: 4,
    title: "📸 Selfie Singles",
    description: "Post your cutest selfies, react, and connect with fun, flirty members instantly 💘",
    image: img4,
    members: 20,
    category: "Social",
    isActive: true,
    onlineMembers: 16,
    newMessages: 12,
    color: "#f9ca24"
  }
];

const categoryIcons = {
  Dating: "💕",
  International: "🌍", 
  Music: "🎵",
  Social: "📱"
};

const GroupSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Dating', 'International', 'Music', 'Social'];
  
  const filteredGroups = selectedCategory === 'All' 
    ? groups 
    : groups.filter(group => group.category === selectedCategory);

  return (
    <section className="enhanced-group-section">
      <div className="enhanced-group-container">
        {/* Floating Background Elements */}
        <div className="floating-elements">
          <div className="floating-heart">💖</div>
          <div className="floating-star">✨</div>
          <div className="floating-music">🎵</div>
        </div>

        {/* Header Section */}
        <div className="enhanced-group-header">
          <h4 className="enhanced-group-subtitle">Recently Active Groups</h4>
          <h2 className="enhanced-group-title">SHY-EYES ❤️ Most Loved Active Groups</h2>
          <p className="enhanced-group-description">
            Join vibrant communities where connections bloom and friendships flourish
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category !== 'All' && categoryIcons[category]} {category}
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="enhanced-groups-grid">
          {filteredGroups.map((group, index) => (
            <div 
              key={group.id}
              className={`enhanced-group-card ${hoveredCard === group.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(group.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ '--accent-color': group.color }}
            >
              {/* Status Badge */}
              <div className={`enhanced-status-badge ${group.isActive ? 'active' : 'inactive'}`}>
                <div className="enhanced-status-dot"></div>
                {group.isActive ? 'Active Now' : 'Offline'}
              </div>

              {/* New Messages Badge */}
              {group.newMessages > 0 && (
                <div className="new-messages-badge">
                  {group.newMessages} new
                </div>
              )}

              {/* Card Content */}
              <div className="enhanced-card-content">
                {/* Image Section */}
                <div className="enhanced-group-image">
                  <img 
                    src={group.image} 
                    alt={group.title}
                  />
                  <div className="enhanced-image-overlay"></div>
                  
                  {/* Category tag */}
                  <div className="enhanced-category-tag">
                    {categoryIcons[group.category]} {group.category}
                  </div>

                  {/* Online indicator */}
                  {group.isActive && (
                    <div className="online-indicator">
                      <div className="pulse-dot"></div>
                      {group.onlineMembers} online
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="enhanced-group-content">
                  <div className="enhanced-group-info">
                    <h4>{group.title}</h4>
                    <p>{group.description}</p>
                  </div>

                  <div className="enhanced-group-actions">
                    {/* Member Stack */}
                    <div className="enhanced-members-section">
                      <div className="enhanced-member-avatars">
                        {memberImgs.slice(0, 4).map((mem, i) => (
                          <img
                            key={i}
                            src={mem}
                            alt={`member-${i}`}
                            className="enhanced-member-avatar"
                            style={{ zIndex: 5 - i }}
                          />
                        ))}
                        <div className="enhanced-member-count">
                          {group.members}+
                        </div>
                      </div>
                      <div className="enhanced-member-info">
                        <span className="enhanced-member-count-text">
                          {group.members} active members
                        </span>
                        {group.isActive && (
                          <span className="enhanced-online-status">
                            • {group.onlineMembers} online now
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <a 
                      href={isLogin ? "/active-group" : "/login"}
                      className="enhanced-join-btn"
                    >
                      <span className="btn-icon">👥</span>
                      <span className="btn-text">
                        {isLogin ? 'Join Group' : 'Login to Join'}
                      </span>
                      <div className="btn-bg"></div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="enhanced-hover-overlay"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="enhanced-stats-section">
          {[
            { label: 'Active Groups', value: '24+', icon: '👥' },
            { label: 'Total Members', value: '1.2K+', icon: '❤️' },
            { label: 'Daily Messages', value: '5K+', icon: '💬' },
            { label: 'Success Stories', value: '150+', icon: '✨' }
          ].map((stat, index) => (
            <div key={index} className="enhanced-stat-item">
              <div className="enhanced-stat-icon">{stat.icon}</div>
              <div className="enhanced-stat-value">{stat.value}</div>
              <div className="enhanced-stat-label">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* View All Groups Button */}
        <div className="enhanced-view-all-container">
          <a href="/groups" className="enhanced-view-all-btn">
            <span>→</span>
            View All Groups
          </a>
        </div>
      </div>
    </section>
  );
};

export default GroupSection;