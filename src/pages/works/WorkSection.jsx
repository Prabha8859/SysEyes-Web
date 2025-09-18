import React from 'react';
import img1 from '../../assets/images/work/01.png';
import img2 from '../../assets/images/work/02.png';
import img3 from '../../assets/images/work/03.png';

const steps = [
  { 
    id: 1, 
    title: "Create Your Profile", 
    description: "Sign up and tell us about yourself. Upload your best photos and share your interests to attract like-minded singles.",
    icon: img1
  },
  { 
    id: 2, 
    title: "Discover Your Matches", 
    description: "Browse through verified profiles, use filters to find your perfect match, and start meaningful conversations instantly.",
    icon: img2
  },
  { 
    id: 3, 
    title: "Start Dating & Enjoy!", 
    description: "Connect, chat, and plan your first date. With SHY-EYES, you're just a few clicks away from exciting real-life connections.",
    icon: img3
  }
];

const WorkSection = () => {
  return (
    <section className="work-section padding-tb">
      <div className="container">
        <div className="section-header">
          <h4 className="theme-color">How SHY-EYES Works?</h4>
          <h2>You're Just 3 Simple Steps Away From Finding Love ❤️</h2>
        </div>
        <div className="section-wrapper">
          <div className="row justify-content-center g-5">
            {steps.map(step => (
              <div className="col-lg-4 col-sm-6 col-12 px-4" key={step.id}>
                <div className="lab-item work-item">
                  <div className="lab-inner text-center">
                    <div className="lab-thumb">
                      <div className="thumb-inner">
                        <img src={step.icon} alt="work-img" />
                        <div className="step">
                          <span>Step</span>
                          <p>{step.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="lab-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
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

export default WorkSection;