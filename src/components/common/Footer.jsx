import React from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../assets/images/footer/icons/01.png';
import img2 from '../../assets/images/footer/icons/02.png';
import img3 from '../../assets/images/footer/about.jpg';
import img4 from '../../assets/images/footer/icons/03.png';

import imgs1 from '../../assets/images/footer/01.jpg';
import imgs2 from '../../assets/images/footer/02.jpg';
import imgs3 from '../../assets/images/footer/03.jpg';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="container">
          <div className="row g-3 justify-content-center g-lg-0">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="footer-top-item lab-item">
                <div className="lab-inner">
                  <div className="lab-thumb">
                    <img src={img1} alt="Phone-icon" />
                  </div>
                  <div className="lab-content">
                    <span>Phone Number : +00000000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="footer-top-item lab-item">
                <div className="lab-inner">
                  <div className="lab-thumb">
                    <img src={img2} alt="email-icon" />
                  </div>
                  <div className="lab-content">
                    <span>Email : admin@shyeyes.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="footer-top-item lab-item">
                <div className="lab-inner">
                  <div className="lab-thumb">
                    <img src={img4} alt="location-icon" />
                  </div>
                  <div className="lab-content">
                    <span>Address : noida, Greater Noida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-middle padding-tb" style={{backgroundImage: "url(assets/images/footer/bg.png)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="footer-middle-item-wrapper">
                <div className="footer-middle-item mb-lg-0">
                  <div className="fm-item-title">
                    <h4>About SHY-EYES</h4>
                  </div>
                  <div className="fm-item-content">
                    <p className="mb-4">
                      Energistically coordinate highly efficient procesr
                      partnerships befor revolutionar growth strategie
                      improvement viaing awesome
                    </p>
                    <img src={img3} alt="about-image" className="footer-abt-img" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-12">
              <div className="footer-middle-item-wrapper">
                <div className="footer-middle-item mb-lg-0">
                  <div className="fm-item-title">
                    <h4>our Recent news</h4>
                  </div>
                  <div className="fm-item-content">
                    <div className="fm-item-widget lab-item">
                      <div className="lab-inner">
                        <div className="lab-thumb">
                          <a href="#">
                            <img src={imgs1} alt="footer-widget-img" />
                          </a>
                        </div>
                        <div className="lab-content">
                          <h6>
                            <Link to="/blog-single">
                              Enable Seamin Matera Forin And Our Orthonal Create Vortals.
                            </Link>
                          </h6>
                          <p>July 23, 2021</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="fm-item-widget lab-item">
                      <div className="lab-inner">
                        <div className="lab-thumb">
                          <a href="#">
                            <img src={imgs2} alt="footer-widget-img" />
                          </a>
                        </div>
                        <div className="lab-content">
                          <h6>
                            <Link to="/blog-single">
                              Dynamca Network Otuitive Catays For Plagiarize Mindshare After
                            </Link>
                          </h6>
                          <p>July 23, 2021</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="fm-item-widget lab-item">
                      <div className="lab-inner">
                        <div className="lab-thumb">
                          <a href="#">
                            <img src={imgs3} alt="footer-widget-img" />
                          </a>
                        </div>
                        <div className="lab-content">
                          <h6>
                            <Link to="/blog-single">
                              Dynamca Network Otuitive Catays For Plagiarize Mindshare After
                            </Link>
                          </h6>
                          <p>July 23, 2021</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-12">
              <div className="footer-middle-item-wrapper">
                <div className="footer-middle-item-3 mb-lg-0">
                  <div className="fm-item-title">
                    <h4>Our Newsletter Signup</h4>
                  </div>
                  <div className="fm-item-content">
                    <p>
                      By subscribing to our mailing list you will always
                      be update with the latest news from us.
                    </p>
                    <form>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter email" />
                      </div>
                      <button type="submit" className="lab-btn">
                        Send Massage <i className="icofont-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom-content text-center">
                <p>
                  &copy; 2025 <Link to="/">SHY-EYES</Link> — India's Most Trusted Dating Platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;