import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import Aos from 'aos';
import img1 from '../../assets/images/story/01.jpg';
import img2 from '../../assets/images/story/02.jpg';
import img3 from '../../assets/images/story/03.jpg';
import img4 from '../../assets/images/about/04.png';
const AboutUs = () => {
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
  }, []);

  return (
    <> 
    <div className="about-us-page">
      {/* Page Header Section */}
      <section className="page-header-section style-1 bg-pink">
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
      <section className="section">
        <div className="images-wrapper" data-aos="fade-right" id="images-section">
          <div className="images">
            <img src={img1} alt="Dating Couple" />
            <img src={img2} alt="Romantic Moment" />
          </div>
          <div className="badge" id="experience-badge">
            <i className="fa-solid fa-heart"></i> 15+ Years of Love Connections
          </div>
        </div>

        <div className="text" data-aos="fade-left">
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

          <button>JOIN NOW</button>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="stats-section" data-aos="fade-up">
        <div className="stat-box">
          <i className="fa-solid fa-user-plus"></i>
          <h3>5,000+</h3>
          <p>Connections Made</p>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-heart"></i>
          <h3>3,200+</h3>
          <p>Happy Couples</p>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-calendar-check"></i>
          <h3>15+</h3>
          <p>Years in Love Business</p>
        </div>
        <div className="stat-box">
          <i className="fa-solid fa-globe"></i>
          <h3>50+</h3>
          <p>Countries Served</p>
        </div>
      </section>

      {/* SECTION 4: EXPERTISE */}
      <section className="our-expertise-duplicate-overlay">
        <div className="expertise-container">
          <div className="expertise-text" style={{backgroundColor: '#f4e7ed'}}>
            <h4 className="subtitle">Our Expertise</h4>
            <h2 className="title" style={{color: '#3a3939'}}>Building Meaningful Connections with Care & Expertise</h2>
            <p className="description" style={{color: '#555'}}>
              At HeartMatch, we specialize in creating genuine connections that turn into lasting relationships. 
              Our platform blends technology with a personal touch to make finding your perfect match exciting, safe, 
              and tailored to your preferences.
            </p>
            <div className="progress-item">
              <span style={{color: '#323232'}}>Match Accuracy</span>
              <span className="percent" style={{color: '#323232'}}>92%</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '92%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <span style={{color: '#323232'}}>Profile Verification</span>
              <span className="percent" style={{color: '#323232'}}>97%</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '97%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <span style={{color: '#323232'}}>User Engagement</span>
              <span className="percent" style={{color: '#323232'}}>89%</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '89%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <span style={{color: '#323232'}}>Success Stories</span>
              <span className="percent" style={{color: '#323232'}}>95%</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
          <div className="expertise-image">
            <img src={img3} alt="Happy Couple on a Date" />
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUs;