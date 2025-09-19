import React, { useState } from 'react';

import img01 from '../../assets/images/banner/01.png'
import img02 from '../../assets/images/banner/google.png'

const BannerSection = () => {
  // State for form data
  const [formData, setFormData] = useState({
    gender: '',
    lookingFor: '',
    ageFrom: '18',
    ageTo: '18+',
    city: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your form submission logic here
    alert('Find Your Partner button clicked!');
  };

  // Handle social login
  // const handleSocialLogin = (provider) => {
  //   console.log(`Login with ${provider}`);
  //   alert(`Login with ${provider} clicked!`);
  // };
  return (
    <section className="banner-section">
      <div className="container">
        <div className="section-wrapper">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="banner-content">
                <div className="intro-form">
                  <div className="intro-form-inner">
                    <h3>Welcome to SHY-EYES</h3>
                    <p>Real Connections Start with <strong>SHY-EYES</strong> – </p>
                     <form className="banner-form" onSubmit={handleSubmit}>
                    {/* I am a field */}
                    <div className="form-row gender">
                      <div className="left">I am a</div>
                      <div className="right">
                        <select 
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Looking for field */}
                    <div className="form-row person">
                      <div className="left">Looking for</div>
                      <div className="right">
                        <select 
                          name="lookingFor"
                          value={formData.lookingFor}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Age field */}
                    <div className="form-row age">
                      <div className="left">Age</div>
                      <div className="right">
                        <div className="custom-select">
                          <select 
                            name="ageFrom"
                            value={formData.ageFrom}
                            onChange={handleInputChange}
                          >
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                        <div className="custom-select">
                          <select 
                            name="ageTo"
                            value={formData.ageTo}
                            onChange={handleInputChange}
                          >
                            <option value="18+">18+</option>
                            <option value="20+">20+</option>
                            <option value="25+">25+</option>
                            <option value="30+">30+</option>
                            <option value="35+">35+</option>
                            <option value="40+">40+</option>
                            <option value="45+">45+</option>
                            <option value="50+">50+</option>
                            <option value="55+">55+</option>
                            <option value="60+">60+</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* City field */}
                    <div className="form-row city city-row">
                      <div className="left">City</div>
                      <div className="right">
                        <input 
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Your City Name.."
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit">
                      Find Your Partner
                    </button>
                    </form>
                    <ul className="social-list">
                      <li className="google">
                        <a href="/">
                          <img src={img02} alt="Google" />
                          <span>Continue with Google</span>
                        </a>
                      </li>
                      <li className="facebook">
                        <a href="#">
                          <i className="icofont-facebook"></i>
                        </a>
                      </li>
                      <li className="twitter">
                        <a href="#">
                          <i className="icofont-twitter"></i>
                        </a>
                      </li>
                    </ul>
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