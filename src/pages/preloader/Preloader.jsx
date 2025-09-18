import React from 'react';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-inner">
        <dotlottie-wc 
          src="https://lottie.host/8d6af0b2-23e7-46ba-a471-679685df0972/nYaMcOGKyJ.lottie"
          style={{width: "200px", height: "200px"}} 
          speed="1" 
          autoplay 
          loop
        ></dotlottie-wc>
      </div>
    </div>
  );
};

export default Preloader;