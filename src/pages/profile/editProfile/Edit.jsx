import React, { useState, useEffect, useRef } from "react";
import DefaultImage from "../../../assets/images/profile/cover.jpg";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    dob: "",
    about: "",
  });

  const [profileImage, setProfileImage] = useState(DefaultImage);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          "https://chat.bitmaxtest.com/admin/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error("Invalid response format");
        }

        if (!res.ok) throw new Error(json.message || "Failed to fetch profile");

        const data = json.data || {};
        setFormData({
          f_name: data.f_name || "",
          l_name: data.l_name || "",
          phone: data.phone || "",
          age: data.age || "",
          gender: data.gender || "",
          location: data.location || "",
          dob: data.dob || "",
          about: data.about || "",
        });

        if (data.image_url) setProfileImage(data.image_url);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ You are not logged in!");
        return;
      }

      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) form.append(key, formData[key]);
      });

      if (fileInputRef.current?.files[0]) {
        form.append("img", fileInputRef.current.files[0]);
      }

      const res = await fetch(
        "https://chat.bitmaxtest.com/admin/api/profile/update",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response format (not JSON)");
      }

      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editprofile-container">
      <div className="editprofile-header">
        <span className="editprofile-back-arrow">←</span>
        <h2>Edit Profile</h2>
      </div>

      <div className="editprofile-card">
        <div className="editprofile-profile-pic-container">
          <img
            src={profileImage}
            alt="Profile"
            className="editprofile-profile-pic"
          />
          {isEditing && (
            <span
              className="editprofile-edit-icon"
              onClick={() => fileInputRef.current.click()}
            >
              ✎
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            disabled={!isEditing}
          />
        </div>

        {!isEditing ? (
          <div className="editprofile-info">
            <h3>
              {formData.f_name} {formData.l_name}
            </h3>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Age:</strong> {formData.age}
            </p>
            <p>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>DOB:</strong> {formData.dob}
            </p>
            <p>
              <strong>About:</strong> {formData.about}
            </p>
            <button
              className="editprofile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <form className="editprofile-form" onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              name="f_name"
              value={formData.f_name}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="l_name"
              value={formData.l_name}
              onChange={handleChange}
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <label>About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
            <div className="editprofile-btn-row">
              <button
                type="submit"
                className="editprofile-btn"
                disabled={loading}
              >
                {loading ? "Updating..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;