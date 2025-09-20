import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For back button navigation
import img1 from '../../assets/images/contact/01.png';
import img2 from '../../assets/images/contact/02.png';
import img3 from '../../assets/images/contact/03.png';
import img4 from '../../assets/images/contact/04.png';
import './contact.css'; // Import the CSS file for styling

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    number: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    
    // Simulate submission
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      number: '',
      message: ''
    });
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="contact-hero-section">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <div className="container-fluid px-4 px-md-5">
            <div className="row align-items-center hero-min-height">
              <div className="col-12 text-center">
                <div className="hero-content-inner">
                  <h1 className="hero-title">Connect With Us</h1>
                  <p className="hero-subtitle">
                    We're here to help you find your perfect match. 
                    Get in touch and let's make magic happen!
                  </p>
                  <Link to="/" className="btn-back-home">
                    <i className="fas fa-home me-2"></i>Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="container-fluid px-4 px-md-5">
          <div className="row g-4">
            {/* Left Side - Enhanced Form */}
            <div className="col-lg-7">
              <div className="contact-form-card">
                <div className="card-header">
                  <div className="header-content">
                    <div className="header-icon-wrapper">
                      <i className="fas fa-envelope-open-text header-icon"></i>
                      <i className="fas fa-heart header-icon-secondary"></i>
                    </div>
                    <h3 className="card-title">Send Us a Message</h3>
                    <p className="card-subtitle">
                      We'd love to hear from you. Share your thoughts and we'll get back to you soon.
                    </p>
                  </div>
                  
                  {/* Social Links in Form Header */}
                  <div className="form-social-links">
                    <span className="social-label">Connect with us:</span>
                    <div className="social-icons-inline">
                      <a href="#" className="social-icon facebook" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon twitter" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-icon instagram" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="contact-form-inner" noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-user me-2"></i>Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-envelope me-2"></i>Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-mobile-alt me-2"></i>Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-tag me-2"></i>Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-comment-dots me-2"></i>Your Message *
                        </label>
                        <textarea
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          className="form-control"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className={`submit-btn ${submitStatus === 'success' ? 'submitted' : ''}`}
                      disabled={submitStatus === 'success'}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <i className="fas fa-check-circle me-2"></i>
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="submit-success">
                      <i className="fas fa-heart"></i>
                      <span>Thank you! We'll get back to you within 24 hours.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Side - Enhanced Contact Info */}
            <div className="col-lg-5">
              <div className="contact-info-card">
                <div className="card-header">
                  <div className="header-content">
                    <div className="info-header-decoration">
                      <span className="decoration-line"></span>
                      <i className="fas fa-phone-alt info-header-icon"></i>
                      <span className="decoration-line"></span>
                    </div>
                    <h3 className="card-title">Get In Touch</h3>
                    <p className="card-subtitle">
                      Find all the information you need to reach our amazing team.
                      We're always here to help!
                    </p>
                  </div>
                </div>

                <div className="contact-info-content">
                  <div className="info-item">
                    <div className="info-icon">
                      <img src={img1} alt="Address" />
                    </div>
                    <div className="info-content">
                      <h5 className="info-title">Our Location</h5>
                      <p className="info-text">
                        1201 Park Street, Fifth Avenue
                        <br />
                        <small>New York, NY 10001</small>
                      </p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <img src={img2} alt="Phone" />
                    </div>
                    <div className="info-content">
                      <h5 className="info-title">Phone Numbers</h5>
                      <p className="info-text">
                        <a href="tel:+22698745632" className="info-link">+226 98 745 632</a>
                        <br />
                        <a href="tel:+02982745" className="info-link">02 982 745</a>
                      </p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <img src={img3} alt="Email" />
                    </div>
                    <div className="info-content">
                      <h5 className="info-title">Email Address</h5>
                      <p className="info-text">
                        <a href="mailto:adminshy-eyes@gmail.com" className="info-link">
                          admin@shy-eyes.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <img src={img4} alt="Website" />
                    </div>
                    <div className="info-content">
                      <h5 className="info-title">Our Website</h5>
                      <p className="info-text">
                        <a href="https://www.shy-eyes-dating.com" className="info-link" target="_blank" rel="noopener noreferrer">
                          www.shy-eyes-dating.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Actions */}
                <div className="quick-actions">
                  <h5 className="quick-actions-title">Quick Actions</h5>
                  <div className="action-buttons">
                    <a href="tel:+22698745632" className="action-btn call-btn">
                      <i className="fas fa-phone"></i>
                      <span>Call Now</span>
                    </a>
                    <a href="mailto:admin@shy-eyes.com" className="action-btn email-btn">
                      <i className="fas fa-envelope"></i>
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="map-section">
                <h4 className="map-title">Find Us On Map</h4>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228225.89119998863!2d-82.1359357856101!3d26.64753629985287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db44a7e78016f5%3A0xafd1a4163a9b6ff2!2sCape%20Coral%2C%20FL%2C%20USA!5e0!3m2!1sen!2sbd!4v1616562014411!5m2!1sen!2sbd"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps Location"
                    className="map-iframe"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;