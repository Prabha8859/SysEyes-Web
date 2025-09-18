import React, { useState } from "react";
import { FaHeart, FaComment, FaEnvelope, FaCheckCircle } from "react-icons/fa";
// import "./Notification.css"; // make sure file is in same folder
 
const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState("all");
 
  const notifications = [
    { id: 1, type: "like", title: "Saloni liked your profile", message: "Saloni liked your profile 💖", time: "2 mins ago" },
    { id: 2, type: "comment", title: "Rahul commented", message: "Rahul commented on your photo: 'You look amazing!'", time: "10 mins ago" },
    { id: 3, type: "match", title: "It's a Match!", message: "It's a Match 🎉 You and Ankit liked each other.", time: "1 hour ago" },
    { id: 4, type: "review", title: "Priya rated you", message: "Priya rated you 5 stars ⭐", time: "Yesterday" },
  ];
 
  const messages = [
    { id: 1, user: "Neha", message: "Hey! How are you? 😊", time: "5 mins ago" },
    { id: 2, user: "Aman", message: "I liked your photo, wanna chat?", time: "1 hour ago" },
  ];
 
  const iconByType = (type) => {
    if (type === "like") return <FaHeart />;
    if (type === "comment") return <FaComment />;
    if (type === "match") return <FaCheckCircle />;
    return <FaHeart />;
  };
 
  return (
    <div id="notifications-page">
      <div className="notification-container">
        <div className="notification-header">
          <h2>Notifications</h2>
 
          <div className="tabs">
            <button
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
          </div>
        </div>
 
        <div className="notification-list">
          {activeTab === "all" &&
            notifications.map((n) => (
              <div key={n.id} className={`notification-card ${n.type}`}>
                <div className="avatar">{iconByType(n.type)}</div>
                <div className="notification-content">
                  <div className="notification-title">
                    <span>{n.title}</span>
                  </div>
                  <div className="notification-message">{n.message}</div>
                  <div className="notification-time">{n.time}</div>
                </div>
              </div>
            ))}
 
          {activeTab === "messages" &&
            messages.map((m) => (
              <div key={m.id} className="notification-card message">
                <div className="avatar"><FaEnvelope /></div>
                <div className="notification-content">
                  <div className="notification-title">
                    <span>{m.user}</span>
                  </div>
                  <div className="notification-message">{m.message}</div>
                  <div className="notification-time">{m.time}</div>
                </div>
              </div>
            ))}
 
          {/* Empty state */}
          {activeTab === "all" && notifications.length === 0 && (
            <div className="empty">No notifications yet.</div>
          )}
          {activeTab === "messages" && messages.length === 0 && (
            <div className="empty">No messages yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default NotificationPage;