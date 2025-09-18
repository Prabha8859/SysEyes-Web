import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Your existing imports
import img1 from '../../assets/images/member/01.jpg';
import img2 from '../../assets/images/member/01.jpg';
import img3 from '../../assets/images/member/01.jpg';
import img4 from '../../assets/images/member/01.jpg';
import img5 from '../../assets/images/member/01.jpg';
import img6 from '../../assets/images/member/01.jpg';
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
            <p>Loading members...</p>
          </div>
        </div>
      </section>
    );
  }

  const maxSlides = Math.max(0, members.length - cardsPerView);

  return (
    <>
      <style jsx>{`
        .carousel-container {
          position: relative;
          overflow: hidden;
          padding: 0 20px;
        }
        
        .carousel-wrapper {
          display: flex;
          transition: transform 0.5s ease-in-out;
          transform: translateX(-${currentIndex * (100 / cardsPerView)}%);
        }
        
        .carousel-slide {
          flex: 0 0 ${100 / cardsPerView}%;
          padding: 0 10px;
        }
        
        /* Square Navigation Buttons */
        .square-nav-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 40px;
        }
        
        .square-nav-btn {
          width: 35px;
          height: 35px;
          border: 2px solid #df314d;
          background: transparent;
          color: #df314d;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
        }
        
        .square-nav-btn:hover {
          background: #df314d;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(223, 49, 77, 0.3);
        }
        
        .square-nav-btn:disabled {
          border-color: #ccc;
          color: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .square-nav-btn:disabled:hover {
          background: transparent;
          color: #ccc;
          transform: none;
        }
        
        @media (max-width: 768px) {
          .square-nav-btn {
            width: 45px;
            height: 45px;
            font-size: 14px;
          }
          
          .square-nav-buttons {
            gap: 10px;
            margin-top: 30px;
          }
        }
        
        .member-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .member-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        
        .member-image-container {
          position: relative;
          padding: 15px 15px 0;
        }
        
        .member-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .member-card:hover .member-image {
          transform: scale(1.05);
        }
        
        .online-indicator {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid white;
          background: #4ade80;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .online-indicator.offline {
          background: #94a3b8;
        }
        
        .member-content {
          padding: 20px 15px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .member-name {
          font-size: 18px;
          font-weight: 700;
          color: #210053;
          margin: 0 0 8px;
          line-height: 1.3;
        }
        
        .member-age {
          font-size: 14px;
          color: #666;
          margin: 0 0 15px;
        }
        
        .member-status {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: white;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: auto;
        }
        
        .member-status.offline {
          background: linear-gradient(135deg, #94a3b8, #64748b);
        }
        
        @media (max-width: 768px) {
          .member-image {
            height: 180px;
          }
          
          .member-name {
            font-size: 16px;
          }
          
          .member-content {
            padding: 15px 10px;
          }
        }
        
        @media (max-width: 576px) {
          .member-image {
            height: 220px;
          }
          
          .member-content {
            padding: 20px 15px;
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
                            </Link>
                            <div className={`online-indicator ${member.online ? '' : 'offline'}`}></div>
                          </div>
                          <div className="member-content">
                            <div>
                              <h6 className="member-name">
                                <Link to={isLogin ? "/profile" : "/login"}>
                                  {member.name}
                                </Link>
                              </h6>
                              <p className="member-age">{member.age}</p>
                            </div>
                            <span className={`member-status ${member.online ? '' : 'offline'}`}>
                              {member.online ? 'Active Now' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Square Navigation Buttons Only */}
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