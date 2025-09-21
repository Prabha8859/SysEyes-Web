import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Your existing imports
import img1 from '../../assets/images/member/01.jpg';
import img2 from '../../assets/images/member/02.jpg';
import img3 from '../../assets/images/member/03.jpg';
import img4 from '../../assets/images/member/04.jpg';
import img5 from '../../assets/images/member/05.jpg';
import img6 from '../../assets/images/member/06.jpg';
import def from '../../assets/images/profile/Women-Avtar.jpg';

const dummyMembers = [
  { id: 1, name: "Aarav Sharma", image: img1, age: "25 Years Old", online: true },
  { id: 2, name: "Priya Singh", image: img2, age: "23 Years Old", online: true },
  { id: 3, name: "Rahul Verma", image: img3, age: "27 Years Old", online: false },
  { id: 4, name: "Ananya Desai", image: img4, age: "24 Years Old", online: true },
  { id: 5, name: "Rohan Kapoor", image: img5, age: "26 Years Old", online: true },
  { id: 6, name: "Simran Kaur", image: img6, age: "22 Years Old", online: false },
  { id: 7, name: "Arjun Patel", image: img1, age: "28 Years Old", online: true },
  { id: 8, name: "Kavya Nair", image: img2, age: "25 Years Old", online: true },
  { id: 9, name: "Vikram Singh", image: img3, age: "29 Years Old", online: false },
  { id: 10, name: "Meera Gupta", image: img4, age: "24 Years Old", online: true },
];

const MemberSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  
  const token = localStorage.getItem("token");
  const isLogin = !!token;

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setCardsPerView(5);
      } else if (width >= 992) {
        setCardsPerView(4);
      } else if (width >= 768) {
        setCardsPerView(3);
      } else if (width >= 576) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const fetchMembers = async () => {
    try {
      if (!token) {
        setMembers(dummyMembers);
        setLoading(false);
        return;
      }

      const res = await fetch("https://chat.bitmaxtest.com/admin/api/active-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.status) {
        const formattedUsers = data.data.map((user) => ({
          id: user.id,
          name: user.name,
          age: user.age || "21 Years Old",
          image: user.image || def,
          online: true,
        }));
        setMembers(formattedUsers);
      } else {
        console.error("Error fetching members:", data.message || "Unknown error");
        setMembers(dummyMembers);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setMembers(dummyMembers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const nextSlide = () => {
    if (currentIndex < members.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="member-section padding-tb">
        <div className="container">
          <div className="section-header">
            <h4 className="theme-color">Meet Exciting Singles Near You!</h4>
            <h2>New Members in India</h2>
          </div>
          <div className="text-center">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading amazing members...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const maxSlides = Math.max(0, members.length - cardsPerView);

  return (
    <>
      <style jsx>{`
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 40px 0;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #df314d;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .carousel-container {
          position: relative;
          overflow: hidden;
          padding: 0 20px;
        }
        
        .carousel-wrapper {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-${currentIndex * (100 / cardsPerView)}%);
        }
        
        .carousel-slide {
          flex: 0 0 ${100 / cardsPerView}%;
          padding: 0 12px;
        }
        
        /* Enhanced Navigation Buttons */
        .square-nav-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        
        .square-nav-btn {
          width: 45px;
          height: 45px;
          border: 2px solid #df314d;
          background: linear-gradient(135deg, transparent, rgba(223, 49, 77, 0.05));
          color: #df314d;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .square-nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(223, 49, 77, 0.1), transparent);
          transition: left 0.6s;
        }
        
        .square-nav-btn:hover::before {
          left: 100%;
        }
        
        .square-nav-btn:hover {
          background: linear-gradient(135deg, #df314d, #ff4d6d);
          color: white;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(223, 49, 77, 0.4);
          border-color: #ff4d6d;
        }
        
        .square-nav-btn:disabled {
          border-color: #ddd;
          color: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
          background: #f8f8f8;
        }
        
        .square-nav-btn:disabled:hover {
          background: #f8f8f8;
          color: #ccc;
          transform: none;
        }
        
        .square-nav-btn:disabled::before {
          display: none;
        }
        
        @media (max-width: 768px) {
          .square-nav-btn {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .square-nav-buttons {
            gap: 15px;
            margin-top: 40px;
          }
        }
        
        /* Enhanced Member Cards */
        .member-card {
          background: linear-gradient(145deg, #ffffff, #fafafa);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid rgba(223, 49, 77, 0.1);
        }
        
        .member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #df314d, #ff4d6d, #df314d);
          background-size: 200% 100%;
          animation: gradientMove 3s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .member-card:hover::before {
          opacity: 1;
        }
        
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .member-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          border-color: rgba(223, 49, 77, 0.2);
        }
        
        .member-image-container {
          position: relative;
          padding: 5px 5px 0;
          overflow: hidden;
        }
        
        .member-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 16px;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(1) saturate(1);
        }
        
        .member-card:hover .member-image {
          transform: scale(1.08);
          filter: brightness(1.1) saturate(1.2);
        }
        
        .member-image-overlay {
          position: absolute;
          top: 18px;
          left: 18px;
          right: 18px;
          bottom: 0;
          border-radius: 16px;
          background: linear-gradient(180deg, transparent 0%, transparent 60%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .member-card:hover .member-image-overlay {
          opacity: 1;
        }
        
        .member-content {
          padding: 8px 0px 10px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
        }
        
        .member-name-container {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin-bottom: 8px;
        }
        
        .member-name {
          font-size: 19px;
          font-weight: 700;
          color: #210053;
          margin: 0;
          line-height: 1.3;
          transition: all 0.3s ease;
        }
        
        .member-name:hover {
          color: #df314d;
          transform: scale(1.02);
        }
        
        .online-pulse-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
        }
        
        .online-pulse-dot.online {
          background-color: #4ade80;
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          animation: pulseGlow 1.8s infinite;
        }
        
        .online-pulse-dot.offline {
          background-color: #94a3b8;
          opacity: 0.6;
        }
        
        @keyframes pulseGlow {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(74, 222, 128, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
        
        .member-age {
          font-size: 15px;
          color: #666;
          margin: 0 0 8px;
          font-weight: 500;
        }
        
        .member-status {
          font-size: 11px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 20px;
          background: #ff69b4;
          color: white;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-top: auto;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .member-card:hover .member-status {
          opacity: 1;
          transform: translateY(0);
        }
        
        .member-status.offline {
          background: #ff69b4;
        }
        
        @media (max-width: 768px) {
          .member-image {
            height: 200px;
          }
          
          .member-name {
            font-size: 17px;
          }
          
          .member-content {
            padding: 20px 15px 18px;
          }
          
          .member-status {
            font-size: 10px;
            padding: 7px 14px;
          }
        }
        
        @media (max-width: 576px) {
          .member-image {
            height: 240px;
          }
          
          .member-content {
            padding: 22px 18px 20px;
          }
          
          .member-image-container {
            padding: 6px 6px 0;
          }
        }

        /* Enhanced Button Styles */
        .member-button-group {
          margin-top: 1rem !important;
        }
        
        .member-button-group .lab-btn {
          border: 2px solid #979695;
          color: #979695;
          background: #00000045;
          padding: 8px 30px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0.3em 0.3em 0 #dd6395;
          position: relative;
          font-size: 16px;
          margin: 0 15px 15px 0;
        }
        
        .member-button-group .lab-btn:hover {
          box-shadow: -0.3em -0.3em 0 #979695;
          background-color: #dd6395;
          border-color: #dd6395;
          color: #fff !important;
          transform: translate(0.3em, 0.3em);
        }
        
        .member-button-group .lab-btn:active {
          transform: translate(0.15em, 0.15em);
          box-shadow: -0.15em -0.15em 0 #979695;
        }
        
        @media (max-width: 768px) {
          .member-button-group .lab-btn {
            padding: 12px 25px;
            font-size: 15px;
            margin: 0 10px 12px 0;
            box-shadow: 0.25em 0.25em 0 #dd6395;
          }
          
          .member-button-group .lab-btn:hover {
            box-shadow: -0.25em -0.25em 0 #979695;
            transform: translate(0.25em, 0.25em);
          }
        }
        
        @media (max-width: 576px) {
          .member-button-group {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .member-button-group .lab-btn {
            margin: 0 0 8px 0;
            width: 100%;
            max-width: 280px;
            justify-content: center;
            padding: 10px 20px;
            font-size: 14px;
          }
        }
      `}</style>
      
      <section className="member-section padding-tb">
        <div className="container">
          <div className="section-header">
            <h4 className="theme-color">Meet Exciting Singles Near You!</h4>
            <h2>New Members in India</h2>
          </div>

          <div className="section-wrapper">
            {members.length > 0 ? (
              <>
                <div className="carousel-container">
                  <div className="carousel-wrapper">
                    {members.map((member) => (
                      <div key={member.id} className="carousel-slide">
                        <div className="member-card">
                          <div className="member-image-container">
                            <Link to={isLogin ? "/profile" : "/login"}>
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="member-image"
                                onError={(e) => {
                                  e.target.src = def;
                                }}
                              />
                              <div className="member-image-overlay"></div>
                            </Link>
                          </div>
                          <div className="member-content">
                            <div>
                              <div className="member-name-container">
                                <Link to={isLogin ? "/profile" : "/login"} style={{ textDecoration: "none" }}>
                                  <h6 className="member-name">{member.name}</h6>
                                </Link>
                                <span className={`online-pulse-dot ${member.online ? 'online' : 'offline'}`}></span>
                              </div>
                              <p className="member-age">{member.age}</p>
                            </div>
                            <span className={`member-status ${member.online ? 'online' : 'offline'}`}>
                              {member.online ? 'Active Now' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Navigation Buttons */}
                {maxSlides > 0 && (
                  <div className="square-nav-buttons">
                    <button
                      className="square-nav-btn"
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    <button
                      className="square-nav-btn"
                      onClick={nextSlide}
                      disabled={currentIndex >= maxSlides}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center">No members found</p>
            )}

            <div className="member-button-group d-flex flex-wrap justify-content-center mt-5">
              <Link to="/register" className="lab-btn me-3 mb-2">
                <i className="icofont-users"></i>
                <span>Join Now & Start Dating</span>
              </Link>
              <Link to="/login" className="lab-btn mb-2">
                <i className="icofont-heart"></i>
                <span>See Who's Waiting for You ❤️</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemberSection;