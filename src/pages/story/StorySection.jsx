import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/story/01.jpg';
import img2 from '../../assets/images/story/02.jpg';
import img3 from '../../assets/images/story/03.jpg';

const stories = [
  {
    id: 1,
    title: "Ankit & Priya - From Chats to Forever ❤️",
    description: "We started chatting casually on SHY-EYES and instantly clicked. Within weeks, we were inseparable. Now, we're planning our engagement!",
    image: img1
  },
  {
    id: 2,
    title: "Rohit & Neha - A Match Made on SHY-EYES ✨",
    description: "Thanks to SHY-EYES, I met the love of my life. We bonded over common interests and now we can't imagine life without each other.",
    image: img2
  },
  {
    id: 3,
    title: "Aarav & Simran - From First Chat to First Date 🌟",
    description: "Never thought a simple message could lead to such a beautiful connection. Our first date was magical, all thanks to SHY-EYES.",
    image: img3
  }
];

const StorySection = () => {
  return (
    <section className="story-section padding-tb bg-img">
      <div className="container">
        <div className="section-header">
          <h4>SHY-EYES Love Stories</h4>
          <h2>Beautiful Journeys That Started With A Swipe 💕</h2>
        </div>
        <div className="section-wrapper">
          <div className="row justify-content-center g-4">
            {stories.map(story => (
              <div className="col-lg-4 col-md-6 col-12" key={story.id}>
                <div className="story-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img src={story.image} alt="img" />
                    </div>
                    <div className="lab-content">
                      <h4><Link to="/blog-single">{story.title}</Link></h4>
                      <p>{story.description}</p>
                      
                      {/* ✅ Read More Button with Blob Effect */}
                      <Link to="/blog-single">
                        <button className="blob-btn">
                          <i className="icofont-circled-right"></i> Read More
                          <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                            </span>
                          </span>
                        </button>
                      </Link>

                      {/* ✅ SVG filter for Blob Effect */}
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix"
                              values="1 0 0 0 0  
                                      0 1 0 0 0  
                                      0 0 1 0 0  
                                      0 0 0 21 -7" result="goo"></feColorMatrix>
                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
