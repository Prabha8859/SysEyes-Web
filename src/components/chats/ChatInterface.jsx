import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import './Chat.css';
import { BiCamera, BiMicrophone, BiPaperPlane } from 'react-icons/bi';
import { PiPaperclipBold } from 'react-icons/pi';
import pristine from '../../assets/images/pristine-609.ogg';
import { Phone, VideoCall } from '@mui/icons-material';
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds free chat
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const timerRef = useRef(null);

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

  // Initialize free chat timer
  useEffect(() => {
    // Show free chat alert on component mount
    Swal.fire({
      title: 'Chat Free Only For 10 Seconds',
      text: 'Enjoy your 10 second free chat now!',
      icon: 'info',
      confirmButtonColor: '#df314d',
      confirmButtonText: 'Start Chat'
    }).then(() => {
      startTimer();
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Scroll to bottom when messages change
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
          showSubscriptionPopup();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Show subscription popup when time ends
  const showSubscriptionPopup = () => {
    Swal.fire({
      title: 'Free Time Over!',
      text: 'Please subscribe to continue the chat.',
      icon: 'warning',
      confirmButtonColor: '#df314d',
      confirmButtonText: 'Subscribe Now'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'pricing-plan';
      }
    });
  };

  // Handle sending messages
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const digitCount = (inputMessage.match(/\d/g) || []).length;
    let displayMsg = inputMessage;

    // Check for digits and show subscription popup if needed
    if (digitCount > 2) {
      displayMsg = inputMessage.replace(/\d/g, 'X');
      
      Swal.fire({
        title: 'Subscription Required',
        text: "This feature is available only for subscribed users.",
        icon: 'info',
        confirmButtonColor: '#df314d',
        confirmButtonText: 'Subscribe Now'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/ShyEyes/pricing-plan.html';
        }
      });
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
        content: 'Hii',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, receiverMessage]);
      
      // Play message sound
      const sound = new Audio({pristine});
      sound.play().catch(() => console.log('Audio play failed'));
    }, 1500);
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle audio call button
  const handleAudioClick = () => {
    Swal.fire({
      title: 'Subscription Required',
      text: "Audio feature is available only for subscribed users.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#df314d',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Subscribe Now'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/ShyEyes/pricing-plan.html';
      }
    });
  };

  // Handle video call button
  const handleVideoClick = () => {
    Swal.fire({
      title: 'Subscription Required',
      text: "Video feature is available only for subscribed users.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#df314d',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Subscribe Now'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/ShyEyes/pricing-plan.html';
      }
    });
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="chat-wrapper">
      {/* Main Chat */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="user">
            <a href="/ShyEyes/profile2.html" className="profile-arrow" title="View Profile">
              <i className="fas fa-arrow-left"></i>
            </a>
            <div className="user-img">
              <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="User" />
              <span className="online-dot"></span>
            </div>
            <div>
              <strong>Shreyu N</strong><br />
              <small className="text-white">Online</small>
            </div>
          </div>
          
          <div id="chat-timer" style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="icons justfy-content-space-between d-flex gap-3">
            <Phone onClick={handleAudioClick}/>
            <VideoCall className="fas fa-video me-3" onClick={handleVideoClick}/>
          </div>
        </div>
        
        <div className="chat-body" ref={chatBodyRef}>
          {/* Render messages */}
          {messages.map(message => (
            <div key={message.id} className={`message-row ${message.type}`}>
              {message.type === 'receiver' && (
                <img src="https://randomuser.me/api/portraits/men/52.jpg" className="profile-pic" alt="Receiver" />
              )}
              <div className={`${message.type}-msg`}>{message.content}</div>
              {message.type === 'user' && (
                <img src="https://randomuser.me/api/portraits/women/65.jpg" className="profile-pic" alt="User" />
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="receiver-thinking">
              Shreyu is typing <span className="dots"><span></span><span></span><span></span></span>
            </div>
          )}
        </div>
        
        <div className="chat-footer">
          <div className="input-wrapper">
            {showEmojiPicker && (
              <div className="emoji-picker">
                {emojis.map((emoji, index) => (
                  <span key={index} onClick={() => handleEmojiSelect(emoji)}>
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your text"
            />
            
            <i 
              className="fas fa-smile" 
              id="emojiBtn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            ></i>
            <BiCamera className="fas fa-camera" id="cameraBtn"/>
            <BiMicrophone className="fas fa-microphone" id="recordBtn"/>
            
            <label htmlFor="pdfUpload">
              <PiPaperclipBold className="fas fa-paperclip"/>
            </label>
            <input type="file" id="pdfUpload" accept="application/pdf" style={{ display: 'none' }} />
          </div>
          
          <button onClick={sendMessage}>
            <BiPaperPlane className="fas fa-paper-plane"/>
          </button>
          
          <div id="hearts"></div>
        </div>
      </div>

    </div>
  );
};

export default ChatInterface;