import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaHeart, FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginSection = () => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show SweetAlert2-like alert
  const showAlert = (title, text, icon, confirmButtonText = "OK") => {
    return new Promise((resolve) => {
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 10000;">
          <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <div style="font-size: 48px; margin-bottom: 20px; color: ${icon === 'success' ? '#4CAF50' : icon === 'error' ? '#f44336' : '#2196F3'};">
              ${icon === 'success' ? '✓' : icon === 'error' ? '✕' : 'ⓘ'}
            </div>
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">${title}</h3>
            <p style="margin: 0 0 25px 0; color: #666; line-height: 1.5;">${text}</p>
            <button onclick="this.closest('div').parentElement.remove(); resolve(true)" style="background: #e91e63; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px;">${confirmButtonText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(alertDiv);
      
      // Add click handler for the button
      const button = alertDiv.querySelector('button');
      button.onclick = () => {
        alertDiv.remove();
        resolve(true);
      };
    });
  };

  // Open Terms Modal
  const openModal = () => {
    if (!formData.email || !formData.password) {
      showAlert("Error!", "Please enter email and password", "error");
      return;
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => setShowModal(false);

  // Checkbox toggle
  const handleAgreeChange = () => setAgreeToTerms(!agreeToTerms);

  // Proceed → API call
  const handleProceed = async () => {
    if (!agreeToTerms) return;

    try {
      const res = await fetch("https://chat.bitmaxtest.com/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token & username/email in localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.username) {
          localStorage.setItem("username", data.username);
          setUser({ username: data.username });
        } else if (data.email) {
          localStorage.setItem("username", data.email);
          setUser({ username: data.email });
        }

        closeModal();
        showAlert("Congratulations!", "You have logged in successfully.", "success", "Go to Profile").then(() => {
          window.location.href = "/";
        });
      } else {
        showAlert("Login Failed!", data.message || "Invalid email or password", "error");
      }
    } catch (err) {
      showAlert("Error!", "Something went wrong. Please try again later.", "error");
    }
  };

  return (
    <div className="login-main-container">
      {/* Left Side - Enhanced Dynamic Image Section */}
      <div className="login-left-section">
        <div className="login-image-wrapper">
          <div className="login-decorative-bg">
            {/* Enhanced Floating Hearts with more variety */}
            <div className="floating-hearts">
              <FaHeart className="heart heart-1" />
              <FaHeart className="heart heart-2" />
              <FaHeart className="heart heart-3" />
              <FaHeart className="heart heart-4" />
              <FaHeart className="heart heart-5" />
              <FaHeart className="heart heart-6" />
              <FaHeart className="heart heart-7" />
              <FaHeart className="heart heart-8" />
            </div>

            {/* Animated Background Circles */}
            <div className="floating-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
              <div className="circle circle-4"></div>
            </div>

            {/* Enhanced Login Illustration */}
            <div className="login-illustration">
              <div className="couple-silhouette">
                <div className="person person-1">
                  <div className="head">
                    <div className="face-details">
                      <div className="eye eye-1"></div>
                      <div className="eye eye-2"></div>
                      <div className="smile"></div>
                    </div>
                  </div>
                  <div className="body">
                    <div className="hand hand-left"></div>
                    <div className="hand hand-right"></div>
                  </div>
                </div>
                
                <div className="person person-2">
                  <div className="head">
                    <div className="face-details">
                      <div className="eye eye-1"></div>
                      <div className="eye eye-2"></div>
                      <div className="smile"></div>
                    </div>
                  </div>
                  <div className="body">
                    <div className="hand hand-left"></div>
                    <div className="hand hand-right"></div>
                  </div>
                </div>
                
                <div className="connecting-line">
                  <div className="pulse-dot pulse-1"></div>
                  <div className="pulse-dot pulse-2"></div>
                  <div className="pulse-dot pulse-3"></div>
                </div>
              </div>
              
              {/* Enhanced Text with Animations */}
              <div className="welcome-content">
                <h2 className="welcome-text">Find Your Perfect Match</h2>
                <p className="welcome-subtitle">Connect with like-minded people and discover meaningful relationships</p>
                <div className="romantic-quote">
                  <span className="quote-text">"Love is not about finding someone to complete you, but finding someone to complement you"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right-section">
        <div className="login-form-container">
          <div className="login-header">
            <h1 className="login-title">
              <FaHeart className="title-heart" />
              Welcome to Shy-Eyes
            </h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <form className="modern-login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="form-group modern-input-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="modern-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group modern-input-group">
              <div className="input-wrapper password-input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="modern-input"
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Remember Me + Forget Password */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button type="button" className="modern-login-btn" onClick={openModal}>
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showModal && (
        <div className="modern-modal">
          <div className="modal-backdrop" onClick={closeModal}></div>
          <div className="modern-modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <FaHeart className="modal-heart" />
              <h2>Terms & Conditions</h2>
              <h3>Welcome to Shy-Eyes – Your Trusted Dating Platform</h3>
            </div>

            <div className="modal-body">
              <p>By using our platform, you agree to the following terms and conditions.</p>
              
              <div className="terms-list">
                <div className="term-item">
                  <span className="term-number">1</span>
                  <div>
                    <strong>Age Requirement:</strong>
                    <p>Must be 18+ to register and use our platform.</p>
                  </div>
                </div>
                
                <div className="term-item">
                  <span className="term-number">2</span>
                  <div>
                    <strong>Respectful Behavior:</strong>
                    <p>No harassment, abuse, or inappropriate content allowed.</p>
                  </div>
                </div>
                
                <div className="term-item">
                  <span className="term-number">3</span>
                  <div>
                    <strong>Authentic Information:</strong>
                    <p>Provide truthful and accurate information in your profile.</p>
                  </div>
                </div>
                
                <div className="term-item">
                  <span className="term-number">4</span>
                  <div>
                    <strong>Subscription Fee:</strong>
                    <p>All subscription fees are non-refundable.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <label className="terms-agreement">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={handleAgreeChange}
                />
                <span className="agreement-checkmark"></span>
                <span>I agree to the terms and conditions</span>
              </label>

              <button
                className={`proceed-button ${agreeToTerms ? "enabled" : ""}`}
                disabled={!agreeToTerms}
                onClick={handleProceed}
              >
                Proceed to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-main-container {
          min-height: 90vh;
          display: flex;
          // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 8% 0 10px 0;
          overflow-x: hidden;
          margin:2%;
          // border-radius: 20px;
        }

        /* Enhanced Left Side - Dynamic Image Section */
        .login-left-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: linear-gradient(135deg, #e91e63 0%, #f06292 50%, #ff4081 0%);
          position: relative;
          border-radius:20px;
          overflow: hidden;
        }

        .login-image-wrapper {
          width: 100%;
          max-width: 480px;
          text-align: center;
          position: relative;
          z-index: 3;
        }

        .login-decorative-bg {
          position: relative;
          padding: 3rem 2.5rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: perspective(1000px) rotateX(5deg);
          animation: containerFloat 8s ease-in-out infinite;
        }

        @keyframes containerFloat {
          0%, 100% { transform: perspective(1000px) rotateX(5deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(5deg) translateY(-10px); }
        }

        /* Enhanced Floating Hearts with More Variety */
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 1;
        }

        .heart {
          position: absolute;
          color: rgba(255, 255, 255, 0.4);
          animation: heartFloat 8s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .heart:hover {
          color: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .heart-1 { top: 15%; left: 10%; font-size: 24px; animation-delay: 0s; }
        .heart-2 { top: 70%; right: 15%; font-size: 18px; animation-delay: 2s; }
        .heart-3 { bottom: 25%; left: 25%; font-size: 28px; animation-delay: 4s; }
        .heart-4 { top: 35%; right: 10%; font-size: 20px; animation-delay: 1s; }
        .heart-5 { top: 55%; left: 15%; font-size: 16px; animation-delay: 3s; }
        .heart-6 { bottom: 45%; right: 25%; font-size: 22px; animation-delay: 5s; }
        .heart-7 { top: 25%; left: 50%; font-size: 14px; animation-delay: 1.5s; }
        .heart-8 { bottom: 60%; right: 50%; font-size: 26px; animation-delay: 6s; }

        @keyframes heartFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) rotate(5deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-25px) rotate(-5deg); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-10px) rotate(3deg); 
            opacity: 0.6;
          }
        }

        /* New Floating Circles */
        .floating-circles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 1;
        }

        .circle {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: circleFloat 10s linear infinite;
        }

        .circle-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 30%;
          animation-delay: 2.5s;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          bottom: 30%;
          left: 30%;
          animation-delay: 5s;
        }

        .circle-4 {
          width: 40px;
          height: 40px;
          top: 40%;
          right: 20%;
          animation-delay: 7.5s;
        }

        @keyframes circleFloat {
          0% { 
            transform: rotate(0deg) scale(1); 
            opacity: 0.2;
          }
          50% { 
            transform: rotate(180deg) scale(1.1); 
            opacity: 0.4;
          }
          100% { 
            transform: rotate(360deg) scale(1); 
            opacity: 0.2;
          }
        }

        .login-illustration {
          position: relative;
          z-index: 2;
        }

        /* Enhanced Couple Silhouette */
        .couple-silhouette {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 2.5rem;
          margin-bottom: 2rem;
          position: relative;
          animation: coupleAnimation 6s ease-in-out infinite;
        }

        @keyframes coupleAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .person {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: personBounce 4s ease-in-out infinite;
        }

        .person-2 {
          animation-delay: 1s;
        }

        @keyframes personBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }

        .person .head {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
          margin-bottom: 0.5rem;
          position: relative;
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.4);
        }

        .person .body {
          width: 40px;
          height: 80px;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
          border-radius: 25px 25px 0 0;
          position: relative;
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.4);
        }

        .person-2 .head,
        .person-2 .body {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
        }

        /* Enhanced Face Details */
        .face-details {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        .eye {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #333;
          border-radius: 50%;
          animation: eyeBlink 3s ease-in-out infinite;
        }

        .eye-1 { top: 35%; left: 30%; }
        .eye-2 { top: 35%; right: 30%; }

        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        .smile {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 10px;
          border: 2px solid #333;
          border-top: none;
          border-radius: 0 0 20px 20px;
        }

        /* Enhanced Hands */
        .hand {
          position: absolute;
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }

        .hand-left {
          top: 20%;
          left: -8px;
          animation: handWave 2s ease-in-out infinite;
        }

        .hand-right {
          top: 20%;
          right: -8px;
          animation: handWave 2s ease-in-out infinite reverse;
        }

        @keyframes handWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }

        /* Enhanced Connecting Line */
        .connecting-line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.3), 
            rgba(255, 255, 255, 0.8), 
            rgba(255, 255, 255, 0.3)
          );
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          animation: pulseDot 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .pulse-1 { animation-delay: 0s; }
        .pulse-2 { animation-delay: 0.3s; }
        .pulse-3 { animation-delay: 0.6s; }

        @keyframes pulseDot {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1;
          }
        }

        /* Enhanced Welcome Content */
        .welcome-content {
          text-align: center;
          animation: contentFadeIn 2s ease-out;
        }

        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .welcome-text {
          font-size: 2.4rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 
            0 2px 10px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 255, 255, 0.2);
          animation: textGlow 4s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
          from { text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2); }
          to { text-shadow: 0 2px 15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.4); }
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          margin-bottom: 1.2rem;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }

        .romantic-quote {
          margin-top: 1.5rem;
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .quote-text {
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          line-height: 1.4;
          position: relative;
        }

        .quote-text::before,
        .quote-text::after {
          content: '"';
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: bold;
        }

        /* Right Side - Login Form (Enhanced Spacing) */
        .login-right-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2.5rem;
          background: white;
          margin: 10px 0;
          border-radius: 0 50px 50px 0;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
        }

        .login-form-container {
          width: 100%;
          max-width: 450px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .login-title {
          font-size: 2.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .title-heart {
          color: #e91e63;
          font-size: 2rem;
          animation: heartBeat 2s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .login-subtitle {
          color: #666;
          font-size: 1.1rem;
        }

        .modern-login-form {
          margin-bottom: 2rem;
        }

        .modern-input-group {
          margin-bottom: 1.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #999;
          font-size: 1.1rem;
          z-index: 2;
        }

        .modern-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #eee;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .modern-input:focus {
          outline: none;
          border-color: #e91e63;
          background: white;
          box-shadow: 0 0 0 4px rgba(233, 30, 99, 0.1);
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          color: #999;
          cursor: pointer;
          font-size: 1.1rem;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #e91e63;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #666;
          font-size: 0.9rem;
        }

        .remember-me input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 4px;
          margin-right: 0.5rem;
          display: inline-block;
          position: relative;
          transition: all 0.3s ease;
        }

        .remember-me input[type="checkbox"]:checked + .checkmark {
          background: #e91e63;
          border-color: #e91e63;
        }

        .remember-me input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 2px;
          color: white;
          font-size: 12px;
        }

        .forgot-password {
          color: #e91e63;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: #c2185b;
        }

        .modern-login-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .modern-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
        }

        .register-link {
          text-align: center;
          color: #666;
        }

        .register-link a {
          color: #e91e63;
          text-decoration: none;
          font-weight: bold;
        }

        .register-link a:hover {
          color: #c2185b;
        }

        /* Modal Styles */
        .modern-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }

        .modern-modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #999;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #e91e63;
        }

        .modal-header {
          padding: 2rem 2rem 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        .modal-heart {
          font-size: 3rem;
          color: #e91e63;
          margin-bottom: 1rem;
          animation: heartBeat 2s ease-in-out infinite;
        }

        .modal-header h2 {
          color: #e91e63;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .modal-header h3 {
          color: #333;
          font-size: 1.1rem;
          font-weight: normal;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-body > p {
          margin-bottom: 2rem;
          color: #666;
          line-height: 1.6;
        }

        .terms-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .term-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .term-number {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #e91e63, #f06292);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .term-item strong {
          color: #333;
          display: block;
          margin-bottom: 0.5rem;
        }

        .term-item p {
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        .modal-footer {
          padding: 1rem 2rem 2rem;
          border-top: 1px solid #eee;
        }

        .terms-agreement {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          cursor: pointer;
          color: #333;
        }

        .terms-agreement input[type="checkbox"] {
          display: none;
        }

        .agreement-checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 4px;
          margin-right: 0.75rem;
          display: inline-block;
          position: relative;
          transition: all 0.3s ease;
        }

        .terms-agreement input[type="checkbox"]:checked + .agreement-checkmark {
          background: #e91e63;
          border-color: #e91e63;
        }

        .terms-agreement input[type="checkbox"]:checked + .agreement-checkmark::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 3px;
          color: white;
          font-size: 14px;
        }

        .proceed-button {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: not-allowed;
          transition: all 0.3s ease;
          background: #ccc;
          color: white;
        }

        .proceed-button.enabled {
          background: linear-gradient(135deg, #e91e63, #f06292);
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .proceed-button.enabled:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
        }

        /* Enhanced Responsive Design */
        @media (max-width: 1200px) {
          .login-main-container {
            padding: 20px 0;
          }
          
          .login-left-section {
            padding: 2rem 1.5rem;
          }
          
          .login-decorative-bg {
            padding: 3rem 2rem;
          }
          
          .welcome-text {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 1024px) {
          .login-left-section {
            display: none;
          }
          
          .login-right-section {
            flex: none;
            width: 100%;
            border-radius: 50px;
            margin: 20px;
          }
          
          .login-main-container {
            padding: 40px 20px;
          }
        }

        @media (max-width: 768px) {
          .login-main-container {
            background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
            padding: 20px 0;
          }
          
          .login-right-section {
            padding: 2rem 1.5rem;
            margin: 10px;
            border-radius: 30px;
          }
          
          .login-form-container {
            max-width: none;
          }
          
          .login-title {
            font-size: 1.8rem;
          }
          
          .form-options {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .modern-modal-content {
            margin: 1rem;
            max-width: none;
            border-radius: 15px;
          }
          
          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .login-main-container {
            padding: 10px 0;
          }
          
          .login-right-section {
            padding: 1.5rem 1rem;
            margin: 5px;
            border-radius: 20px;
          }
          
          .login-header {
            margin-bottom: 2rem;
          }
          
          .login-title {
            font-size: 1.5rem;
          }
          
          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }
          
          .term-item {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .term-number {
            align-self: flex-start;
          }
          
          .modern-modal-content {
            border-radius: 10px;
          }
        }

        /* Hide browser password reveal */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
        
        input[type="password"]::-webkit-credentials-auto-fill-button {
          visibility: hidden;
          display: none !important;
        }

        /* Additional Mobile Optimizations */
        @media (max-width: 320px) {
          .login-title {
            font-size: 1.3rem;
            flex-direction: column;
            gap: 0.3rem;
          }
          
          .title-heart {
            font-size: 1.5rem;
          }
          
          .modern-input {
            padding: 0.8rem 0.8rem 0.8rem 2.5rem;
            font-size: 0.9rem;
          }
          
          .input-icon {
            left: 0.8rem;
            font-size: 1rem;
          }
          
          .password-toggle {
            right: 0.8rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSection;