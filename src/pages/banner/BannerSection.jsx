import React, { useState, useEffect } from 'react';

import img01 from '../../assets/images/banner/01.png'
// import img02 from '../../assets/images/banner/google.png'

const BannerSection = () => {
  // Typewriter effect state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Find Your Perfect Match",
    "Connect with Like-minded People",
    "Start Your Love Story Today",
    "Discover Meaningful Relationships",
    "Meet Your Soulmate Here"
  ];

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentFullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        
        if (currentText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <section className="banner-section">
      <div className="container">
        <div className="section-wrapper">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="banner-content">
                <div className="intro-content-box">
                  <div className="intro-content-inner">
                    <div className="main-heading">
                      <h1>Welcome to <span className="brand-name">SHY-EYES</span></h1>
                      <div className="typewriter-container">
                        <h2 className="typewriter-text">
                          {currentText}
                          <span className="cursor">|</span>
                        </h2>
                      </div>
                    </div>
                    
                    <div className="content-description">
                      <p className="intro-text">
                        Where real connections begin and lasting relationships flourish. 
                        Join thousands of singles who have found their perfect match through our platform.
                      </p>
                      
                      <div className="features-list">
                        <div className="feature-item">
                          <span className="feature-highlight">✓</span>
                          <span>Verified Dating Profiles</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">✓</span>
                          <span>Privacy Protected</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">✓</span>
                          <span>Advanced Compatibility</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">✓</span>
                          <span>Real-time Messaging</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cta-section">
                      <button className="primary-cta">
                        <span className="btn-text">Start Your Journey</span>
                        <span className="btn-icon">→</span>
                      </button>
                      <p className="cta-subtitle">Join over 10,000+ happy couples</p>
                    </div>
                    
                    <div className="bottom-section">
                      <p className="trust-text">Trusted by thousands • Secure platform • Real connections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-thumb">
                <img src={img01} alt="SHY-EYES Banner Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="all-shapes">
        {/* Banner shapes */}
      </div>
    </section>
  );
};

export default BannerSection;