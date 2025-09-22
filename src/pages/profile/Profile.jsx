import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserCard from "./UserCard";
import defImg from "../../assets/images/profile/Women-Avtar.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Redirect to chat
  const handleClick = useCallback(() => {
    navigate("/chat");
  }, [navigate]);

  // Fetch active users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      // Static/mock user data - replace with actual API call
      const mockUsers = [
        {
          id: 1,
          name: "Priya Sharma",
          age: "22 Years Old",
          image: defImg,
          online: true,
          location: "Delhi",
          interests: ["Photography", "Travel"]
        },
        {
          id: 2,
          name: "Rahul Verma",
          age: "25 Years Old",
          image: defImg,
          online: false,
          location: "Mumbai",
          interests: ["Music", "Sports"]
        },
        {
          id: 3,
          name: "Sneha Gupta",
          age: "23 Years Old",
          image: defImg,
          online: true,
          location: "Bangalore",
          interests: ["Reading", "Cooking"]
        },
        {
          id: 4,
          name: "Arjun Singh",
          age: "26 Years Old",
          image: defImg,
          online: true,
          location: "Pune",
          interests: ["Gaming", "Movies"]
        },
        {
          id: 5,
          name: "Kavya Patel",
          age: "24 Years Old",
          image: defImg,
          online: false,
          location: "Ahmedabad",
          interests: ["Dancing", "Art"]
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (err) {
      console.error("Error setting users:", err);
      // Show user-friendly error message
      Swal.fire({
        title: "Error",
        text: "Failed to load profiles. Please try again.",
        icon: "error",
        confirmButtonText: "Retry"
      }).then(() => {
        fetchUsers();
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Carousel navigation functions
  const moveToNext = useCallback(() => {
    if (!trackRef.current || users.length === 0) return;
    
    const track = trackRef.current;
    const cardWidth = 320; // Fixed width for consistency
    
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    setTimeout(() => {
      const firstChild = track.firstElementChild;
      if (firstChild) {
        track.appendChild(firstChild);
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        setCurrentIndex(prev => (prev + 1) % users.length);
      }
    }, 500);
  }, [users.length]);

  const moveToPrevious = useCallback(() => {
    if (!trackRef.current || users.length === 0) return;
    
    const track = trackRef.current;
    const cardWidth = 320;
    const lastChild = track.lastElementChild;
    
    if (lastChild) {
      track.style.transition = "none";
      track.insertBefore(lastChild, track.firstElementChild);
      track.style.transform = `translateX(-${cardWidth}px)`;
      
      setTimeout(() => {
        track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = "translateX(0)";
        setCurrentIndex(prev => (prev - 1 + users.length) % users.length);
      }, 10);
    }
  }, [users.length]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || users.length <= 1) return;

    intervalRef.current = setInterval(moveToNext, 4000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [moveToNext, isAutoPlaying, users.length]);

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // SweetAlert for subscription
  const showSubscriptionAlert = useCallback((feature) => {
    Swal.fire({
      title: "Subscription Required",
      text: `${feature} feature is available only for subscribed users.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#df314d",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Subscribe Now",
      cancelButtonText: "Maybe Later"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/pricing-plan");
      }
    });
  }, [navigate]);

  const handleRequest = useCallback((id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, requested: !user.requested } : user
      )
    );
  }, []);

  // Loading component
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Finding perfect matches for you...</p>
    </div>
  );

  return (
    <div className="profile-page">
      {/* Page Header */}
      <section className="page-header-section style-1">
        <div className="hero-background"></div>
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Perfect Matches For You</h2>
                <p>Discover amazing people waiting to connect</p>
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
        <div className="container">
          {loading ? (
            <LoadingSpinner />
          ) : users.length === 0 ? (
            <div className="no-users-container">
              <h3>No profiles found</h3>
              <p>Check back later for new matches!</p>
              <button 
                className="btn btn-primary" 
                onClick={fetchUsers}
              >
                Refresh
              </button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="profile-stats">
                <h3>{users.length} Amazing Profiles Found</h3>
                <p>Showing profile {currentIndex + 1} of {users.length}</p>
              </div>

              {/* Carousel */}
              <div 
                className="carousel-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="carousel-container">
                  {/* Cards Container */}
                  <div className="card-track" ref={trackRef}>
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

                {/* Navigation Arrows - Bottom Position */}
                <div className="carousel-navigation">
                  <button
                    className="carousel-btn prev-btn"
                    onClick={moveToPrevious}
                    aria-label="Previous profile"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Play/Pause Button */}
                  <button
                    className="play-pause-btn"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {/* {isAutoPlaying ? "⏸️" : "▶️"} */}
                  </button>

                  <button
                    className="carousel-btn next-btn"
                    onClick={moveToNext}
                    aria-label="Next profile"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Floating Animation */}
      <dotlottie-wc
        src="https://lottie.host/ee468a01-9f4c-4ccc-8c32-43eda3b6d49b/a94TBYW5n7.lottie"
        className="floating-animation"
        speed="1"
        autoplay
        loop
      />
    </div>
  );
};

export default Profile;