import React, { useState, useEffect, useRef } from 'react';
import { Phone, VideoCall, Send, AttachFile, EmojiEmotions, CameraAlt, Mic } from '@mui/icons-material';
import proimage from '../../assets/images/profile/proimage.jpg';

// Subscription Popup Component
const SubscriptionPopup = ({ show, onClose, onSubscribe }) => {
  if (!show) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚠️</div>
        <h2 style={{ color: '#f65595', marginBottom: '10px', fontSize: '24px' }}>Free Time Over!</h2>
        <p style={{ color: '#666', marginBottom: '25px', fontSize: '16px' }}>
          Please subscribe to continue the chat.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '1px solid #ccc',
              borderRadius: '25px',
              backgroundColor: 'transparent',
              color: '#666',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onSubscribe}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '25px',
              backgroundColor: '#f65595',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Chat Interface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds free chat
  const [isTyping, setIsTyping] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const chatBodyRef = useRef(null);
  const timerRef = useRef(null);

  // Background image - you can replace with your imported image
  const backgroundImage = proimage;
  // Sample emojis
  const emojis = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎',
    '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑',
    '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴',
    '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲',
    '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩',
    '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡',
    '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🥳', '🥰', '💩', '👻', '👽', '😺',
    '😸', '😹', '😻', '😼', '🙈', '🙉', '🙊', '❤️', '🧡', '💛', '💚', '💙',
    '💜', '💰', '💳', '💎', '🔧', '🔨'
  ];

  // Initialize free chat timer on component mount
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Start countdown timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowSubscriptionPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle sending messages
  const sendMessage = () => {
    if (!inputMessage.trim() || timeLeft <= 0) return;

    const digitCount = (inputMessage.match(/\d/g) || []).length;
    let displayMsg = inputMessage;

    // Check for digits and mask them if more than 2
    if (digitCount > 2) {
      displayMsg = inputMessage.replace(/\d/g, 'X');
    }

    // Add user message
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: displayMsg,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate receiver response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const receiverMessage = {
        id: Date.now() + 1,
        type: 'receiver',
        content: 'Hi there! Thanks for your message.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, receiverMessage]);
    }, 1500);
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: `📎 ${file.name}`,
        timestamp: new Date(),
        isFile: true
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle popup actions
  const handleSubscribe = () => {
    alert('Redirecting to subscription page...');
  };

  const handleClosePopup = () => {
    setShowSubscriptionPopup(false);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const chatExpired = timeLeft <= 0;

  return (
    <>
      <style>
        {`
          // @keyframes bounce {
          //   0%, 80%, 100% {
          //     transform: scale(0);
          //   }
          //   40% {
          //     transform: scale(1);
          //   }
          // }

          // @keyframes fadeIn {
          //   from { opacity: 0; transform: translateY(10px); }
          //   to { opacity: 1; transform: translateY(0); }
          // }

          // @keyframes slideUp {
          //   from { opacity: 0; transform: translateY(20px); }
          //   to { opacity: 1; transform: translateY(0); }
          // }

          // @keyframes heartbeat {
          //   0% { transform: scale(1); }
          //   25% { transform: scale(1.05); }
          //   50% { transform: scale(1); }
          //   75% { transform: scale(1.02); }
          //   100% { transform: scale(1); }
          // }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(246, 85, 149, 0.6);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(246, 85, 149, 0.8);
          }

          .message-enter {
            animation: slideUp 0.3s ease-out;
          }

          .typing-indicator {
            animation: fadeIn 0.5s ease-out;
          }

          .chat-container {
            animation: heartbeat 3s ease-in-out infinite;
          }

          @media (max-width: 768px) {
            .chat-container {
              animation: none;
            }
          }
        `}
      </style>
      
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: '80px', // Space for header
        paddingBottom: '20px',
        paddingLeft: '15px',
        paddingRight: '15px',
        position: 'relative'
      }}>
        {/* Background overlay for better contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(246, 85, 149, 0.4))',
          zIndex: 1
        }} />

        <div 
          className="chat-container"
          style={{
            width: '100%',
            maxWidth: '900px',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Chat Header */}
          <div style={{
            backgroundColor: 'rgba(246, 85, 149, 0.95)',
            backdropFilter: 'blur(15px)',
            color: 'white',
            padding: window.innerWidth <= 768 ? '15px 20px' : '20px 25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: window.innerWidth <= 768 ? '12px' : '15px' }}>
              <div style={{ position: 'relative', width: window.innerWidth <= 768 ? '40px' : '50px', height: window.innerWidth <= 768 ? '40px' : '50px' }}>
                <img 
                  src="https://randomuser.me/api/portraits/men/52.jpg" 
                  alt="User"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#06c633',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></span>
              </div>
              <div>
                <div style={{ fontSize: window.innerWidth <= 768 ? '16px' : '18px', fontWeight: 'bold' }}>Shreyu N</div>
                <div style={{ fontSize: window.innerWidth <= 768 ? '11px' : '12px', opacity: 0.9 }}>Online</div>
              </div>
            </div>
            
            <div style={{ 
              color: '#fff', 
              fontWeight: 'bold', 
              fontSize: window.innerWidth <= 768 ? '16px' : '18px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: window.innerWidth <= 768 ? '6px 12px' : '8px 16px',
              borderRadius: '20px',
              backdropFilter: 'blur(5px)'
            }}>
              {formatTime(timeLeft)}
            </div>
            
            <div style={{ display: 'flex', gap: window.innerWidth <= 768 ? '15px' : '20px' }}>
              <Phone style={{ cursor: 'pointer', fontSize: window.innerWidth <= 768 ? '20px' : '24px', opacity: 0.9, transition: 'opacity 0.3s' }}/>
              <VideoCall style={{ cursor: 'pointer', fontSize: window.innerWidth <= 768 ? '20px' : '24px', opacity: 0.9, transition: 'opacity 0.3s' }}/>
            </div>
          </div>
          
          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? '15px' : '20px',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'local',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: window.innerWidth <= 768 ? '12px' : '15px',
              position: 'relative'
            }}
          >
            {/* Chat body overlay for better message readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(2px)',
              zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Time Expired Message */}
              {chatExpired && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(238, 90, 36, 0.9))',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: window.innerWidth <= 768 ? '15px' : '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                  fontSize: window.innerWidth <= 768 ? '14px' : '16px'
                }}>
                  Free Time Over! Please subscribe to continue chatting.
                </div>
              )}

              {/* Render messages */}
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className="message-enter"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: window.innerWidth <= 768 ? '8px' : '12px',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.type === 'receiver' && (
                    <img 
                      src="https://randomuser.me/api/portraits/men/52.jpg" 
                      style={{
                        width: window.innerWidth <= 768 ? '30px' : '35px',
                        height: window.innerWidth <= 768 ? '30px' : '35px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        flexShrink: 0
                      }}
                      alt="Receiver" 
                    />
                  )}
                  <div style={{
                    backgroundColor: message.type === 'user' 
                      ? 'rgba(252, 171, 184, 0.95)' 
                      : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(15px)',
                    padding: window.innerWidth <= 768 ? '12px 16px' : '15px 20px',
                    borderRadius: message.type === 'user' ? '20px 20px 8px 20px' : '20px 20px 20px 8px',
                    maxWidth: window.innerWidth <= 768 ? '85%' : '70%',
                    fontSize: window.innerWidth <= 768 ? '14px' : '15px',
                    color: '#222',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    margin: '5px 0',
                    wordWrap: 'break-word'
                  }}>
                    {message.content}
                  </div>
                  {message.type === 'user' && (
                    <img 
                      src="https://randomuser.me/api/portraits/women/65.jpg" 
                      style={{
                        width: window.innerWidth <= 768 ? '30px' : '35px',
                        height: window.innerWidth <= 768 ? '30px' : '35px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        flexShrink: 0
                      }}
                      alt="User" 
                    />
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="typing-indicator" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  // backdropFilter: 'blur(15px)',
                  padding: window.innerWidth <= 768 ? '12px 16px' : '15px 20px',
                  borderRadius: '20px 20px 20px 8px',
                  maxWidth: 'fit-content',
                  color: '#444',
                  fontSize: window.innerWidth <= 768 ? '13px' : '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  marginLeft: window.innerWidth <= 768 ? '38px' : '47px'
                }}>
                  Shreyu is typing
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#666',
                          borderRadius: '50%',
                          animation: `bounce 1s infinite ease-in-out ${i * 0.16}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Footer */}
          <div style={{
            display: 'flex',
            padding: window.innerWidth <= 768 ? '10px 15px' : '10px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            alignItems: 'center',
            gap: window.innerWidth <= 768 ? '10px' : '15px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}>
            {/* Input Container */}
            <div style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: window.innerWidth <= 768 ? '6px' : '8px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '0',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: window.innerWidth <= 768 ? '10px' : '15px',
                  borderRadius: '15px',
                  width: window.innerWidth <= 768 ? '250px' : '280px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: window.innerWidth <= 768 ? '6px' : '8px',
                  fontSize: window.innerWidth <= 768 ? '18px' : '22px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  zIndex: 9999
                }}>
                  {emojis.map((emoji, index) => (
                    <span 
                      key={index} 
                      onClick={() => handleEmojiSelect(emoji)}
                      style={{
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease-in-out',
                        padding: '4px',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.2)';
                        e.target.style.background = 'rgba(246, 85, 149, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.background = 'transparent';
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Left Icons */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: window.innerWidth <= 768 ? '8px' : '10px', 
                paddingLeft: window.innerWidth <= 768 ? '10px' : '15px' 
              }}>
                <EmojiEmotions 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  style={{ 
                    cursor: 'pointer', 
                    color: '#888', 
                    fontSize: window.innerWidth <= 768 ? '18px' : '22px', 
                    transition: 'color 0.3s' 
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f65595'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                />
                <CameraAlt 
                  style={{ 
                    cursor: 'pointer', 
                    color: '#888', 
                    fontSize: window.innerWidth <= 768 ? '18px' : '22px', 
                    transition: 'color 0.3s' 
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f65595'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                />
                <Mic 
                  style={{ 
                    cursor: 'pointer', 
                    color: '#888', 
                    fontSize: window.innerWidth <= 768 ? '18px' : '22px', 
                    transition: 'color 0.3s' 
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f65595'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                />
                <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                  <AttachFile 
                    style={{ 
                      color: '#888',
                      marginBottom: '10px', 
                      fontSize: window.innerWidth <= 768 ? '18px' : '22px', 
                      transition: 'color 0.3s' 
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#f65595'}
                    onMouseLeave={(e) => e.target.style.color = '#888'}
                  />
                </label>
                <input 
                  type="file" 
                  id="fileUpload" 
                  placeholder='typing here...'
                  onChange={handleFileUpload}
                  style={{ display: 'none' }} 
                />
              </div>
              
              {/* Text Input */}
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={chatExpired ? "Time expired - Subscribe to continue" : "Typing here..."}
                disabled={chatExpired}
                style={{
                  flex: 1,
                  padding: window.innerWidth <= 768 ? '10px 15px' : '12px 20px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: window.innerWidth <= 768 ? '14px' : '15px',
                  color: '#333'
                }}
              />
              
              {/* Send Icon in Input */}
              <div style={{ paddingRight: window.innerWidth <= 768 ? '10px' : '15px' }}>
                <Send 
                  onClick={sendMessage}
                  style={{
                    cursor: inputMessage.trim() && !chatExpired ? 'pointer' : 'not-allowed',
                    color: inputMessage.trim() && !chatExpired ? '#f65595' : '#ccc',
                    fontSize: window.innerWidth <= 768 ? '18px' : '22px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (inputMessage.trim() && !chatExpired) {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.color = '#e6457e';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    if (inputMessage.trim() && !chatExpired) {
                      e.target.style.color = '#f65595';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <SubscriptionPopup 
          show={showSubscriptionPopup} 
          onClose={handleClosePopup} 
          onSubscribe={handleSubscribe} 
        />
      </div>
    </>
  );
};

export default ChatInterface;