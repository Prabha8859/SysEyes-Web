import React, { useState } from 'react';
import img1 from '../../assets/images/contact/01.png';
import img2 from '../../assets/images/contact/02.png';
import img3 from '../../assets/images/contact/03.png';
import img4 from '../../assets/images/contact/04.png';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    number: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <>
        <section class="page-header-section style-1 bg-pink">
        <div class="container">
            <div class="page-header-content">
                <div class="page-header-inner">
                    <div class="page-title">
                        <h2>Shy-Eyes Contact Us</h2>
                    </div>
                    <ol class="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li class="active">Contact Us</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <div className="contact-section bg-ash">
      <div className="contact-top padding-tb aside-bg padding-b">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <article className="contact-form-wrapper">
                <div className="contact-form">
                  <h4>Don't Be A Stranger Just Say Hello.</h4>
                  <p className="mb-5">
                    We do fast phone repair. In most to repair your device in just minutes,
                    we'll normally get connection inutes, we'll normally ge.
                  </p>
                  <form onSubmit={handleSubmit} id="commentform" className="comment-form">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name*"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      required
                    />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject*"
                      required
                    />
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="Mobile Number*"
                      required
                    />
                    <textarea
                      name="message"
                      id="role"
                      cols="30"
                      rows="8"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message*"
                      required
                    ></textarea>
                    <button type="submit" className="lab-btn">
                      <span>Send Our Message</span>
                    </button>
                  </form>
                </div>
              </article>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-wrapper">
                <div className="contact-info-title">
                  <h5>Get Information</h5>
                  <p>Our Contact information Details and Follow us on social media</p>
                </div>
                <div className="contact-info-content">
                  <div className="contact-info-item">
                    <div className="contact-info-inner">
                      <div className="contact-info-thumb">
                        <img src={img1} alt="address" />
                      </div>
                      <div className="contact-info-details">
                        <span className="fw-bold">Office Address</span>
                        <p>1201 park street, Fifth Avenue</p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-inner">
                      <div className="contact-info-thumb">
                        <img src={img2} alt="phone" />
                      </div>
                      <div className="contact-info-details">
                        <span className="fw-bold">Phone Number</span>
                        <p>+22698 745 632,02 982 745</p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-inner">
                      <div className="contact-info-thumb">
                        <img src={img3} alt="email" />
                      </div>
                      <div className="contact-info-details">
                        <span className="fw-bold">Send Mail</span>
                        <p>adminshy-eyes@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-inner">
                      <div className="contact-info-thumb">
                        <img src={img4} alt="website" />
                      </div>
                      <div className="contact-info-details">
                        <span className="fw-bold">Our Website</span>
                        <p>www.shy-eyes-dating.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="contac-bottom">
          <div className="row justify-content-center g-0">
            <div className="col-12">
              <div className="location-map">
                <div id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228225.89119998863!2d-82.1359357856101!3d26.64753629985287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db44a7e78016f5%3A0xafd1a4163a9b6ff2!2sCape%20Coral%2C%20FL%2C%20USA!5e0!3m2!1sen!2sbd!4v1616562014411!5m2!1sen!2sbd"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactSection;