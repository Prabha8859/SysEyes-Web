import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Member.css';
const MembershipPlans = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const openPaymentModal = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan('');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert(`Payment submitted for ${selectedPlan} plan!`);
    closePaymentModal();
  };

  const plans = [
    {
      name: "Starter Love Plan",
      price: "₹999",
      description: "₹999 Now, then ₹1999 / Month",
      features: [
        { text: "View member profiles", included: true },
        { text: "Send 10 messages daily", included: true },
        { text: "Access public chat rooms", included: true },
        { text: "Video calling feature", included: false },
        { text: "Priority matchmaking", included: false },
        { text: "Access exclusive events", included: false }
      ],
      buttonText: "Start Your Journey",
      planId: "Starter Love"
    },
    {
      name: "Romantic Silver Plan",
      price: "₹2999",
      description: "₹2999 Now, then ₹3999 / Month",
      features: [
        { text: "View member profiles", included: true },
        { text: "Unlimited messaging", included: true },
        { text: "Access public & private chat rooms", included: true },
        { text: "Video calling feature", included: true },
        { text: "Priority matchmaking", included: false },
        { text: "Access exclusive events", included: false }
      ],
      buttonText: "Upgrade to Silver",
      planId: "Romantic Silver"
    },
    {
      name: "Premium Gold Love Plan",
      price: "₹4999",
      description: "₹4999 Now, then ₹5999 / Month",
      features: [
        { text: "View member profiles", included: true },
        { text: "Unlimited messaging & media sharing", included: true },
        { text: "Access all chat rooms (public & private)", included: true },
        { text: "Video calling feature", included: true },
        { text: "Priority matchmaking with AI", included: true },
        { text: "Access exclusive SHY-EYES dating events", included: true }
      ],
      buttonText: "Go Premium Gold",
      planId: "Premium Gold"
    }
  ];

  return (
    <>
      {/* Page Header Section */}
      <section className="page-header-section style-1 bg-pink">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Membership Level</h2>
              </div>
              <ol className="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">Membership-level</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plan Section */}
      <section className="pricing-section padding-tb bg-ash">
        <div className="container">
          <div className="section-header text-center">
            <h4 className="theme-color">SHY-EYES Membership Plans</h4>
            <h2>Choose Your Perfect Dating Plan</h2>
          </div>
          <div className="section-wrapper mt-4">
            <div className="pricing-plan-wrapper">
              <div className="row gx-2 gy-3 justify-content-center">
                {plans.map((plan, index) => (
                  <div key={index} className="col-lg-4 col-sm-6">
                    <div className="price-item">
                      <div className="price-item-inner">
                        <div className="price-top">
                          <h6>{plan.name}</h6>
                          <h2>{plan.price}</h2>
                          <p>{plan.description}</p>
                        </div>
                        <div className="price-bottom">
                          <ul>
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex}>
                                <i className={`icofont-${feature.included ? 'check' : 'close'}-circled`}></i>
                                {feature.text}
                              </li>
                            ))}
                          </ul>
                          <button 
                            className="purchase-btn"
                            onClick={() => navigate("/payment", { state: { planId: plan.planId } })}
                          >
                            {plan.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="pay-modal" style={{ display: 'block' }}>
          <div className="pay-content">
            <span className="pay-close" onClick={closePaymentModal}>×</span>
            <h3>Complete Payment for {selectedPlan}</h3>
            <img src="https://via.placeholder.com/200x200?text=Payment+QR" alt="Payment QR Code" />
            <form onSubmit={handlePaymentSubmit}>
              <input 
                type="text" 
                className="utrInput" 
                placeholder="Enter UTR Number" 
                required 
              />
              <button type="submit" className="submitPay">
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipPlans;