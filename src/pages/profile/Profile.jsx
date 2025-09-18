import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserCard from "./UserCard";
import defImg from "../../assets/images/profile/Women-Avtar.jpg";
const Profile = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect to chat
  const handleClick = () => {
    window.location.href = "/chat";
  };

  // ✅ Fetch active users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // use token if available
      const res = await fetch("https://chat.bitmaxtest.com/admin/api/best-matches", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();

      if (res.ok && data.status) {
        // Map API users → match UserCard props
        const formattedUsers = data.data.map((user) => ({
          id: user.id,
          name: user.name,
          age: user.age || "21 Years Old", // API doesn’t provide age → fallback
          image: user.image || defImg,
          online: true,
        }));
        setUsers(formattedUsers);
      } else {
        console.error("Failed to fetch:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Carousel auto-slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track || users.length === 0) return;

    const cardWidth = track.children[0]?.offsetWidth + 20 || 320;

    const moveLeft = () => {
      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${cardWidth}px)`;
      setTimeout(() => {
        track.appendChild(track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
      }, 500);
    };

    const interval = setInterval(moveLeft, 4000);
    return () => clearInterval(interval);
  }, [users]);

  // ✅ SweetAlert for subscription
  const showSubscriptionAlert = (feature) => {
    Swal.fire({
      title: "Subscription Required",
      text: `${feature} feature is available only for subscribed users.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Subscribe Now",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/pricing-plan");
      }
    });
  };

  const handleRequest = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, requested: !user.requested } : user
      )
    );
  };

  return (
    <div className="profile-page">
      {/* Page Header */}
      <section className="page-header-section style-1 bg-pink">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Some Matches To Your Profile</h2>
              </div>
              <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="active">Profiles</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="profile-section">
        {loading ? (
          <p className="text-center">Loading members...</p>
        ) : users.length === 0 ? (
          <p className="text-center">No members found</p>
        ) : (
          <div className="carousel-container">
            {/* Manual arrows */}
            <button
              className="arrow-btn"
              onClick={() =>
                trackRef.current &&
                trackRef.current.lastElementChild &&
                trackRef.current.insertBefore(
                  trackRef.current.lastElementChild,
                  trackRef.current.firstElementChild
                )
              }
            >
              &#10094;
            </button>
            <button
              className="arrow-btn"
              onClick={() =>
                trackRef.current &&
                trackRef.current.firstElementChild &&
                trackRef.current.appendChild(trackRef.current.firstElementChild)
              }
            >
              &#10095;
            </button>

            <div className="card-container" ref={trackRef}>
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onChatClick={handleClick}
                  onRequest={handleRequest}
                  onShowAlert={showSubscriptionAlert}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Floating Animation */}
      <dotlottie-wc
        src="https://lottie.host/ee468a01-9f4c-4ccc-8c32-43eda3b6d49b/a94TBYW5n7.lottie"
        style={{
          width: "150px",
          height: "150px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "9999",
        }}
        speed="1"
        autoplay
        loop
      ></dotlottie-wc>
    </div>
  );
};

export default Profile;
