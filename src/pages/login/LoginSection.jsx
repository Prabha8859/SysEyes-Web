import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaHeart, FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";

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
            <h1 className="login-title" style={{ color: 'maroon' }}>
              <FaHeart className="title-heart " />
              Welcome to Shy-Eyes
            </h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <form className="modern-login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="form-group modern-input-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" style={{ color: "pink" }} />
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
                <FaLock className="input-icon" style={{ color: "pink" }} />
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
                  {showPassword ? <FaEyeSlash style={{ color: "pink" }}/> : <FaEye style={{ color: "pink" }}/>}
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
              Login
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

     
    </div>
  );
};

export default LoginSection;