import React, { useState, useRef } from "react";
import "./Nextstep.css";
import { FaCamera, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NextStep() {
  const [dob, setDob] = useState("2007-01-10");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("male");
  const [location, setLocation] = useState({
    street: "",
    city: "",
    state: "",
    country: ""
  });
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dobRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 📌 Auto-calc Age from DOB
  const handleDobChange = (e) => {
    const selectedDate = e.target.value;
    setDob(selectedDate);

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
    setAge(calculatedAge);
  };

  // 📌 Profile Image Upload Preview
  const handleProfileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  // 📌 Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 📌 Signup API call
  const handleSignup = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Missing User ID or Token. Please complete Step 1 first.");
        return;
      }

      if (file && file.size > 2 * 1024 * 1024) {
        alert("Profile image must be less than 2MB.");
        return;
      }

      setLoading(true);

      // Format DOB -> d F Y
      const birthDate = new Date(dob);
      const formattedDob = `${birthDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${birthDate.toLocaleString("en-GB", {
        month: "long",
      })} ${birthDate.getFullYear()}`;

      const formData = new FormData();
      formData.append("user_id", userId);
      if (file) formData.append("img", file);
      formData.append("dob", formattedDob);
      formData.append("age", age);
      formData.append("gender", gender);

      const locationString = [location.street, location.city, location.state, location.country]
        .filter(Boolean)
        .join(", ");
      formData.append("location", locationString);
      formData.append("about", about);

      const response = await fetch("https://chat.bitmaxtest.com/admin/api/register/step2", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        console.error("Non-JSON response from API");
      }

      if (response.ok && data.status) {
        alert(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile"); // ✅ redirect to profile page instead of login
      } else {
        if (response.status === 422 && data.errors) {
          alert("Validation error: " + JSON.stringify(data.errors));
        } else {
          alert(data.message || "Step 2 failed!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personal-background">
      <div className="personal-container">
        <form className="personal-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="personal-title">Personal Information</h2>

          {/* Logout Button */}
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          {/* Profile Pic Upload */}
          <div
            className="profile-pic"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="pic-circle">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-preview" />
              ) : (
                <FaCamera className="camera-icon" />
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

          {/* Date of Birth */}
          <label>Date of Birth</label>
          <div className="dob-input">
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              ref={dobRef}
            />
            <FaCalendarAlt
              className="calendar-icon"
              onClick={() => dobRef.current.showPicker()}
            />
          </div>

          {/* Age */}
          <label>Age</label>
          <input type="number" value={age} readOnly />

          {/* Gender */}
          <label>Gender</label>
          <div className="gender-group">
            {["male", "female", "other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* Location */}
          <label>Location</label>
          <div className="location-group">
            {["street", "city", "state", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={location[field]}
                onChange={(e) => setLocation({ ...location, [field]: e.target.value })}
              />
            ))}
          </div>

          {/* About */}
          <label>About</label>
          <textarea
            placeholder="Tell us about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          {/* Signup Button */}
          <button
            type="button"
            className="signup-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Saving..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
