import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import Aos from 'aos';
import img1 from '../../assets/images/story/01.jpg';
import img2 from '../../assets/images/story/02.jpg';
import img3 from '../../assets/images/story/story9.webp';

// import img4 from '../../assets/images/story/Story3.jpg';
import img5 from '../../assets/images/story/story4.webp';
import img6 from '../../assets/images/story/story6.jpg';
import img7 from '../../assets/images/story/story7.webp';



const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stats, setStats] = useState({
    connections: 0,
    couples: 0,
    years: 0,
    countries: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Image carousel for expertise section
  const carouselImages = [img3, img5, img6, img7];

  useEffect(() => {
    // Initialize AOS animation
    if (typeof window !== 'undefined') {
      Aos.init({ duration: 1200, once: true });
    }

    // Badge animation
    const section = document.getElementById('images-section');
    const badge = document.getElementById('experience-badge');

    if (section && badge) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            badge.classList.add('show');
          }
        });
      }, { threshold: 0.5 });

      observer.observe(section);
    }

    // Stats counter animation
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateStats();
          setHasAnimated(true);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Image carousel auto-rotate
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [hasAnimated, carouselImages.length]);

  const animateStats = () => {
    const targets = {
      connections: 5000,
      couples: 3200,
      years: 15,
      countries: 50
    };

    const duration = 2500; // 2.5 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        connections: Math.floor(targets.connections * progress),
        couples: Math.floor(targets.couples * progress),
        years: Math.floor(targets.years * progress),
        countries: Math.floor(targets.countries * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, stepTime);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <> 
    <div className="about-us-page">
      {/* Page Header Section */}
      <section className="page-header-section">
        <div className="header-overlay"></div>
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>About Us</h2>
              </div>
              <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="active">About Us</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="images-wrapper" data-aos="fade-right" id="images-section">
              <div className="images">
                <img src={img1} alt="Dating Couple" />
                <img src={img2} alt="Romantic Moment" />
              </div>
              <div className="badge" id="experience-badge">
                <i className="fa-solid fa-heart"></i> 15+ Years of Love Connections
              </div>
            </div>

            <div className="text-content" data-aos="fade-left">
              <h4><i className="fa-solid fa-heart"></i> About Shy-Eye</h4>
              <h2>Where Love Finds You</h2>
              <p>At Shy-Eye, we believe love can bloom anywhere — all it takes is the right spark.  
              With years of experience helping shy hearts connect, we create opportunities for meaningful relationships that last a lifetime.</p>

              <ul className="features">
                <li><i className="fa-solid fa-heart"></i> Personalized Matchmaking</li>
                <li><i className="fa-solid fa-heart"></i> Safe & Private Connections</li>
                <li><i className="fa-solid fa-heart"></i> Real People, Real Love</li>
                <li><i className="fa-solid fa-heart"></i> Global Community</li>
              </ul>

              <button className="join-btn">
                <span>JOIN NOW</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS WITH COUNTER ANIMATION */}
      <section className="stats-section" data-aos="fade-up" ref={statsRef}>
        <div className="stat-box">
          <i className="fa-solid fa-user-plus"></i>
          <h3>{stats.connections.toLocaleString()}+</h3>
          <p>Connections Made</p>
          <div className="stat-shine"></div>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-heart"></i>
          <h3>{stats.couples.toLocaleString()}+</h3>
          <p>Happy Couples</p>
          <div className="stat-shine"></div>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-calendar-check"></i>
          <h3>{stats.years}+</h3>
          <p>Years in Love Business</p>
          <div className="stat-shine"></div>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-globe"></i>
          <h3>{stats.countries}+</h3>
          <p>Countries Served</p>
          <div className="stat-shine"></div>
        </div>
      </section>

      {/* SECTION 4: EXPERTISE WITH EQUAL HEIGHT AND FEATURE CARDS */}
      <section className="expertise-section" data-aos="fade-up">
        <div className="container-fluid">
          <div className="expertise-container">
            <div className="expertise-text">
              <h4 className="subtitle">Our Expertise</h4>
              <h2 className="title">Building Meaningful Connections with Care & Expertise</h2>
              <p className="description">
                At Shy-Eye, we specialize in creating genuine connections that turn into lasting relationships. 
                Our platform blends technology with a personal touch to make finding your perfect match exciting, safe, 
                and tailored to your preferences.
              </p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <i className="fa-solid fa-shield-heart feature-icon-new"></i>
                  <h4>Safe & Secure</h4>
                  <p>Your privacy and security are our top priority with advanced verification systems.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fa-solid fa-users feature-icon-new"></i>
                  <h4>Smart Matching</h4>
                  <p>Advanced algorithms that understand your preferences to find compatible partners.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fa-solid fa-heart-pulse feature-icon-new"></i>
                  <h4>24/7 Support</h4>
                  <p>Our dedicated team is always here to help you on your journey to find love.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fa-solid fa-star feature-icon-new"></i>
                  <h4>Success Stories</h4>
                  <p>Thousands of happy couples who found their perfect match through our platform.</p>
                </div>
              </div>
            </div>
            
            <div className="expertise-image-carousel">
              <div className="carousel-container">
                <img 
                  src={carouselImages[currentImageIndex]} 
                  alt="Happy Couple" 
                  className="carousel-image"
                />
                <div className="carousel-dots">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <div className="dot-ripple"></div>
                    </button>
                  ))}
                </div>
                <div className="carousel-progress">
                  <div 
                    className="carousel-progress-bar" 
                    style={{
                      width: `${((currentImageIndex + 1) / carouselImages.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUs;