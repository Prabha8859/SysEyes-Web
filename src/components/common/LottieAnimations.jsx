import React from 'react';

const LottieAnimations = () => {
  return (
    <>
      <dotlottie-wc 
        className="bottom-left-lottie"
        src="https://lottie.host/bb2e1cf4-809b-484d-a3e9-1defcba49af4/ti439wNbfk.lottie" 
        speed="1" 
        autoplay 
        loop
      ></dotlottie-wc>
      <dotlottie-wc 
        src="https://lottie.host/4afa7324-f055-4ae1-b3de-f2e84ede69d2/13WgK0RE6K.lottie" 
        style={{
          width: "230px",
          height: "230px",
          position: "fixed",
          bottom: "20px",
          right: "0px",
          zIndex: "9999"
        }} 
        speed="1" 
        autoplay 
        loop
      ></dotlottie-wc>
    </>
  );
};

export default LottieAnimations;