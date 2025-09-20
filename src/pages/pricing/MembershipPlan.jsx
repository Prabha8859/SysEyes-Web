import React, { useState } from 'react';

const MembershipPlans = () => {
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
      planId: "Starter Love",
      popular: false
    },
    {
      name: "Romantic Silver Plan",
      price: "₹2999",
      description: "₹2999 Now, then ₹3999 / Month",
      features: [
        { text: "View member profiles", included: true },
        { text: "Unlimited messaging", included: true },
        { text: "Access public & private rooms", included: true },
        { text: "Video calling feature", included: true },
        { text: "Priority matchmaking", included: false },
        { text: "Access exclusive events", included: false }
      ],
      buttonText: "Upgrade to Silver",
      planId: "Romantic Silver",
      popular: true
    },
    {
      name: "Premium Gold Love Plan",
      price: "₹4999",
      description: "₹4999 Now, then ₹5999 / Month",
      features: [
        { text: "View member profiles", included: true },
        { text: "Unlimited msg&media sharing", included: true },
        { text: "Access all (public & private)", included: true },
        { text: "Video calling feature", included: true },
        { text: "Priority matchmaking with AI", included: true },
        { text: "Access exclus SHY-EYES dating", included: true }
      ],
      buttonText: "Go Premium Gold",
      planId: "Premium Gold",
      popular: false
    }
  ];

  const ArrowSVG = () => (
    <svg width="40px" height="25px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
        <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
        <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
      </g>
    </svg>
  );

  return (
    <>
      <style jsx>{`
        // @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        // * {
        //   margin: 0;
        //   padding: 0;
        //   box-sizing: border-box;
        // }

        // body {
        //   font-family: 'Poppins', sans-serif;
        //   line-height: 1.6;
        // }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .page-header-section {
          background: linear-gradient(rgba(255, 192, 203, 0.8), rgba(233, 30, 99, 0.1)),
                      url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          height:auto;
        }

        .page-header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 192, 203, 0.1) 0%, rgba(233, 30, 99, 0.2) 100%);
          z-index: 1;
        }

        .page-header-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          // background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="%23ffffff"></path><path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="%23ffffff"></path><path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="%23ffffff"></path></svg>') repeat-x;
          background-size: 1200px 120px;
          animation: wave 10s linear infinite;
          z-index: 2;
        }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-1200px); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          position: relative;
          z-index: 3;
        }

        .page-header-content {
          text-align: center;
          color: white;
          margin-top:5%;
        }

        .page-title h2 {
          color: white;
          margin-bottom: 20px;
          font-size: 3.5rem;
          font-weight: 800;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .breadcrumb {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .breadcrumb li {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .breadcrumb li:not(:last-child):after {
          content: '→';
          margin-left: 15px;
          color: rgba(255,255,255,0.7);
          font-size: 1.5rem;
        }

        .breadcrumb a {
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 8px 15px;
          border-radius: 25px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        }

        .breadcrumb a:hover {
          color: white;
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .breadcrumb li.active {
          color: #ffd700;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        /* Floating Hearts Animation */
        .page-header-section .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .page-header-section .floating-hearts::before,
        .page-header-section .floating-hearts::after {
          content: '💕';
          position: absolute;
          font-size: 2rem;
          color: rgba(255,255,255,0.3);
          animation: float 8s linear infinite;
        }

        .page-header-section .floating-hearts::before {
          left: 10%;
          animation-delay: 0s;
        }

        .page-header-section .floating-hearts::after {
          left: 80%;
          animation-delay: 4s;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-header-section {
            padding: 60px 0;
            background-attachment: scroll;
          }

          .page-title h2 {
            font-size: 2.5rem;
          }

          .breadcrumb {
            flex-direction: column;
            gap: 15px;
          }

          .breadcrumb li:not(:last-child):after {
            content: '↓';
            margin-left: 0;
            margin-top: 5px;
          }
        }

        @media (max-width: 480px) {
          .page-title h2 {
            font-size: 2rem;
          }

          .breadcrumb li {
            font-size: 1rem;
          }
        }
        
        .page-title h2 {
          color: #333;
          margin-bottom: 10px;
          font-size: 2.5rem;
          font-weight: 700;
        }
        
        .breadcrumb {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
        }
        
        .breadcrumb li {
          margin-right: 5px;
        }
        
        .breadcrumb li:not(:last-child):after {
          content: '/';
          margin-left: 5px;
        }
        
        .breadcrumb li.active {
          color: #e91e63;
        }

        .breadcrumb a {
          color: #333;
          text-decoration: none;
        }

        /* Pricing Section */
        .pricing-section {
          padding: 80px 0;
          background-color: #f8f9fa;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h4 {
          color: #e91e63;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .section-header h2 {
          font-size: 2.8rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 20px;
        }

        .pricing-plan-wrapper {
          margin-top: 40px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          // margin: 0 -15px;
        }

        .col-lg-4 {
          flex: 0 0 350px;
          max-width: 350px;
          padding: 0 15px;
        }

        /* Enhanced Price Item Styles */
        .price-item {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          // height: 100%;
          border: 2px solid transparent;
        }

        .price-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #e91e63, #c2185b, #ad1457);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .price-item:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(233, 30, 99, 0.15);
          border-color: #e91e63;
        }

        .price-item:hover::before {
          opacity: 1;
        }

        /* Popular Plan Styling */
        .price-item.popular {
          position: relative;
          border: 2px solid #e91e63;
          transform: scale(1.05);
        }

        .price-item.popular::before {
          opacity: 1;
          height: 5px;
          background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
        }

        .price-item.popular::after {
      
          content: 'MOST POPULAR';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
          z-index: 10;
          letter-spacing: 1px;
        }

        .price-item-inner {
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Price Top Section */
        .price-top {
          text-align: center;
          padding: 40px 30px 30px;
          background: linear-gradient(135deg, #f8f9ff, #e8f4fd);
          position: relative;
          flex-grow: 0;
        }

        /* Plan Icons */
        .price-top::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .price-item:nth-child(1) .price-top::before {
          content: '💝';
          background: linear-gradient(135deg, #ff9a9e, #fecfef);
        }

        .price-item:nth-child(2) .price-top::before {
          content: '🥈';
          background: linear-gradient(135deg, #c9d6ff, #e2e2e2);
        }

        .price-item:nth-child(3) .price-top::before {
          content: '👑';
          background: linear-gradient(135deg, #ffecd2, #fcb69f);
        }

        .price-top h6 {
          color: #e91e63;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 10px;
          margin-top: 40px;
        }
        
        .price-top h2 {
          font-size: 3.5rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 15px;
          line-height: 1;
        }
        
        .price-top p {
          color: #666;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Price Bottom Section */
        .price-bottoms {
          padding: 20px 15px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .price-bottoms ul {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
          flex-grow: 1;
        }
        
        .price-bottoms ul li {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          // padding: 5px 0;
          transition: all 0.3s ease;
        }

        .price-bottoms ul li:hover {
          background: #f8f9ff;
          padding-left: 15px;
          padding-right: 15px;
          margin-left: -15px;
          margin-right: -15px;
          border-radius: 8px;
        }
        
        .price-bottoms ul li i {
          margin-right: 15px;
          font-size: 18px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        /* Check and Cross Icons */
        .price-bottoms ul li i.icofont-check-circled {
          background: #4CAF50;
          color: white;
        }

        .price-bottoms ul li i.icofont-check-circled::before {
          content: '✓';
        }
        
        .price-bottoms ul li i.icofont-close-circled {
          background: #F44336;
          color: white;
        }

        .price-bottoms ul li i.icofont-close-circled::before {
          content: '✗';
        }

        /* Enhanced Animated Button */
        .purchase-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 7px;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background: #e91e63;
          border: none;
          cursor: pointer;
          transition: 0.5s;
          box-shadow: 6px 6px 0 black;
          transform: skewX(-15deg);
          border-radius: 5px;
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-top: auto;
        }

        .purchase-btn:focus {
          outline: none;
        }

        .purchase-btn:hover {
        // margin-top: 30px;
          transition: 0.3s;
          box-shadow: 10px 10px 0 #FBC638;
          background: #c2185b;
        }

        .purchase-btn span {
          transform: skewX(15deg);
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .purchase-btn .arrow-container {
          transition: 0.5s;
          margin-left: 15px;
        }

        .purchase-btn:hover .arrow-container {
          margin-left: 25px;
          transition: 0.3s;
        }

        /* Arrow SVG */
        .purchase-btn svg {
          width: 40px;
          height: 25px;
        }

        .purchase-btn path.one {
          transition: 0.4s;
          transform: translateX(-60%);
        }

        .purchase-btn path.two {
          transition: 0.5s;
          transform: translateX(-30%);
        }

        .purchase-btn:hover path.three {
          animation: color_anim 1s infinite 0.2s;
        }

        .purchase-btn:hover path.one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }

        .purchase-btn:hover path.two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }

        @keyframes color_anim {
          0% { fill: white; }
          50% { fill: #FBC638; }
          100% { fill: white; }
        }

        /* Wave Animation for Cards */
        .price-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0 10 Q 25 0 50 10 T 100 10 V 20 H 0 Z" fill="rgba(233,30,99,0.05)"/></svg>') repeat-x;
          animation: wave 15s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .price-item:hover::after {
          opacity: 1;
        }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }

        /* Payment Modal Styles */
        .pay-modal {
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .pay-content {
          background: #fff;
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          padding: 30px 25px;
          text-align: center;
          position: relative;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          animation: modalZoom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes modalZoom {
          from {
            transform: scale(0.7);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .pay-close {
          position: absolute;
          right: 15px;
          top: 10px;
          cursor: pointer;
          font-size: 28px;
          font-weight: 600;
          color: #666;
          transition: color 0.3s;
        }

        .pay-close:hover {
          color: #e91e63;
        }
        
        .pay-content h3 {
          color: #333;
          margin-bottom: 25px;
          font-size: 1.6rem;
        }

        .pay-content img {
          width: 200px;
          height: 200px;
          margin: 15px auto 25px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .utrInput {
          width: 100%;
          padding: 15px;
          margin: 15px 0;
          border: 2px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .utrInput:focus {
          outline: none;
          border-color: #e91e63;
        }
        
        .submitPay {
          padding: 15px 30px;
          background: #e91e63;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }

        .submitPay:hover {
          background: #c2185b;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .row {
            flex-direction: column;
            align-items: center;
          }

          .col-lg-4 {
            flex: 0 0 100%;
            max-width: 350px;
          }

          .price-item.popular {
            transform: none;
            margin: 20px 0;
          }

          .section-header h2 {
            font-size: 2.2rem;
          }

          .price-top h2 {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 10px;
          }

          .page-title h2 {
            font-size: 2rem;
          }

          .section-header h2 {
            font-size: 1.8rem;
          }

          .price-top h2 {
            font-size: 2.5rem;
          }

          .purchase-btn {
            font-size: 1rem;
            padding: 12px 25px;
          }

          .pay-content {
            padding: 25px 20px;
            margin: 20px;
          }
        }
      `}</style>

      {/* Page Header Section */}
      <section className="page-header-section">
        <div className="floating-hearts"></div>
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Membership Level</h2>
              </div>
              <ol className="breadcrumb">
                <li><a href="#" onClick={(e) => e.preventDefault()}>Home</a></li>
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
              <div className="row  justify-content-center">
                {plans.map((plan, index) => (
                  <div key={index} className="col-lg-4 col-sm-6">
                    <div className={`price-item ${plan.popular ? 'popular' : ''}`}>
                      <div className="price-item-inner">
                        <div className="price-top">
                          <h6>{plan.name}</h6>
                          <h2>{plan.price}</h2>
                          <p>{plan.description}</p>
                        </div>
                        <div className="price-bottoms">
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
                            onClick={() => openPaymentModal(plan.planId)}
                          >
                            <span>
                              {plan.buttonText}
                              <span className="arrow-container">
                                <ArrowSVG />
                              </span>
                            </span>
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