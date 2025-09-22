import React, { useEffect, useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Camera, Calendar } from 'lucide-react';
import image1 from '../../assets/images/Story1.jpg';
import { Link } from 'react-router-dom';
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUserStep2 } from "./API/registrationSlice";

import './Register.css';
// import api from "../../api/axios";
import api from "axios";

const MultiStepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);

  
  
  // Step 1 data
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirm_password: ''
  });

  // Step 2 data
  const [personalData, setPersonalData] = useState({
    dob: '',
    age: '',
    gender: 'male/Female',
    location: {
      street: '',
      city: '',
      state: '',
      country: ''
    },
    about: '',
    profilePic: null,
    file: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  

  const dobRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirm_password') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const showMessageBox = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 2000);
  };

  const sendOtp = () => {
    if (!formData.email) {
      showMessageBox("Please enter the email first!");
      return;
    }
    setShowOtpPopup(true);
  };

  const verifyOtp = () => {
    if (otp === '') {
      showMessageBox("Please enter OTP");
      return;
    }
    setIsEmailVerified(true);
    setShowOtpPopup(false);
    showMessageBox("Email verified successfully!");
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      showMessageBox("Please verify your email first!");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      showMessageBox("Passwords do not match!");
      return;
    }
    if (formData.phone.length !== 10) {
      showMessageBox("Phone number must be exactly 10 digits!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
      showMessageBox("Step 1 completed! Please fill your personal information.");
    }, 1500);
  };

  // Step 2 handlers
  const handleDobChange = (e) => {
    const selectedDate = e.target.value;
    const newPersonalData = { ...personalData, dob: selectedDate };

    const birthDate = new Date(selectedDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    newPersonalData.age = calculatedAge;
    setPersonalData(newPersonalData);
  };

  const handleProfileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newPersonalData = { ...personalData };
      newPersonalData.file = uploadedFile;
      const reader = new FileReader();
      reader.onload = () => {
        newPersonalData.profilePic = reader.result;
        setPersonalData(newPersonalData);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleLocationChange = (field, value) => {
    setPersonalData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };
const handleFinalSubmit = async () => {
  try {
    setLoading(true);

    // 📌 Image validation
    if (personalData.file && personalData.file.size > 2 * 1024 * 1024) {
      showMessageBox("Profile image must be less than 2MB.");
      setLoading(false);
      return;
    }

    // Format DOB (YYYY-MM-DD required by API)
    const birthDate = new Date(personalData.dob);
    const formattedDob = birthDate.toISOString().split("T")[0]; // e.g. 1995-05-12

    // ✅ API body
    const payload = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      phoneNo: formData.phone,
      password: formData.password,
      dob: formattedDob,
      age: personalData.age,
      gender: personalData.gender,
      street: personalData.location.street,
      city: personalData.location.city,
      state: personalData.location.state,
      country: personalData.location.country,
      postalCode: personalData.location.postalCode || "000000", // fallback
      bio: personalData.about,
      hobbies: ["Reading", "Traveling"],
    };

    // ✅ Real API call
    const res = await api.post(
      "https://shyeyes-b.onrender.com/api/users/register",
      payload
    );

    setLoading(false);
    showMessageBox(res.data.message || "Registration Completed Successfully!");
    console.log("User registered:", res.data);

    // 🚨 Agar aap sirf testing ke liye setTimeout use karna chahte the,
    // toh usko rakho, warna hata do (kyunki ab API call already ho rahi hai)
    /*
    setTimeout(() => {
      setLoading(false);
      showMessageBox("Registration Completed Successfully!");
      console.log("Registration Data:", {
        step1: formData,
        step2: {
          ...personalData,
          dob: formattedDob,
          location: Object.values(personalData.location).filter(Boolean).join(", ")
        }
      });
    }, 2000);
    */

  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    showMessageBox(
      error.response?.data?.message || "Server error. Please try again later."
    );
  }
};

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  // Heart animation effect
  useEffect(() => {
    const heartContainer = document.getElementById("hearts-container");
    if (!heartContainer) return;
    
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 5 + 3 + "s";
      heartContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);   
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      

      <div className="heart-container" id="hearts-container"></div>

      {showMessage && (
        <div className="message-box">
          {message}
        </div>
      )}

      {showOtpPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Email Verification</h3>
            <p>Enter the OTP sent to <b>{formData.email}</b></p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button onClick={verifyOtp} className="verify-btn">Verify</button>
              <button onClick={() => setShowOtpPopup(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="signup-wrapper">
        <div className="image-section">
          <img 
            src={image1} 
            alt="Registration illustration" 
            className="animated-image" 
          />
        </div>

        <div className="signup-container">
          {/* Step Indicator */}
          <div className="step-indicator">
            <div className="step">
              <div className={`step-number ${currentStep >= 1 ? 'active' : 'inactive'}`}>
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <span className="step-text">Basic Information</span>
            </div>
            <div className={`step-connector ${currentStep > 1 ? 'completed' : ''}`}></div>
            <div className="step">
              <div className={`step-number ${currentStep === 2 ? 'active' : 'completed'}`}>
                {currentStep === 2 ? '2' : ''}
              </div>
              <span className="step-text">Personal Details</span>
            </div>
          </div>


          {currentStep === 1 ? (
            <form onSubmit={handleStep1Submit} style={{ width: '100%' }}>
              <h2>Create Account</h2>
              
              {/* Name Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <span className="icon"><User /></span>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <span className="icon"><User /></span>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="email-container">
                  <span className="icon"><Mail /></span>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isEmailVerified}
                  />
                  <button
                    type="button"
                    className="otp-btn"
                    onClick={sendOtp}
                    disabled={isEmailVerified}
                  >
                    {isEmailVerified ? "Verified" : "Verify Email"}
                  </button>
                </div>
              </div>

              {/* Phone and Address Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <span className="icon"><Phone /></span>
                  <input
                    type="text"
                    placeholder="10 Digit Phone Number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <span className="icon"><MapPin /></span>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <span className="icon"><Lock /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter 8-digit password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => togglePassword('password')}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <span className="icon"><Lock /></span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirm_password"
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => togglePassword('confirm_password')}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
              </div>

              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? "Please wait..." : "Continue to Step 2"}
              </button>

              <div className="login-link">
                Already have an account? <Link to="/login" style={{ color: '#e43059' }}>Login</Link>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
              <h2>Personal Information</h2>

              {/* Profile Pic Upload */}
              <div
                className="profile-pic"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="pic-circle">
                  {personalData.profilePic ? (
                    <img src={personalData.profilePic} alt="Profile" className="profile-preview" />
                  ) : (
                    <Camera className="camera-icon" />
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileUpload}
              />

              {/* Date of Birth & Age */}
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <div className="dob-input">
                    <input
                      type="date"
                      value={personalData.dob}
                      onChange={handleDobChange}
                      ref={dobRef}
                    />
                    <Calendar
                      className="calendar-icon"
                      onClick={() => dobRef.current?.showPicker?.()}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="number" 
                    value={personalData.age} 
                    readOnly 
                    style={{ paddingLeft: '15px' }}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>Gender</label>
                <div className="gender-group">
                  {["male", "female", "other"].map((g) => (
                    <label key={g}>
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={personalData.gender === g}
                        onChange={(e) => setPersonalData({...personalData, gender: e.target.value})}
                      />
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label>Location</label>
                <div className="location-group">
                  {["street", "city", "state", "country"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={personalData.location[field]}
                      onChange={(e) => handleLocationChange(field, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="form-group">
                <label>About</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  value={personalData.about}
                  onChange={(e) => setPersonalData({...personalData, about: e.target.value})}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="button-group">
                <button
                  type="button"
                  className="back-btn"
                  onClick={goBackToStep1}
                  disabled={loading}
                >
                  Back to Step 1
                </button>
                <button
                  type="button"
                  className="signup-btn"
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  style={{flex: 1}}
                >
                  {loading ? "Creating Account..." : "Complete Registration"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;