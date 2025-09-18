import React, { useEffect } from "react";
import './Heart.css';
 
const HeartsBackground = () => {
  useEffect(() => {
    const container = document.querySelector(".hearts-container");
 
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
 
      // Random position (X-axis)
      heart.style.left = Math.random() * 100 + "vw";
      // Random size
      heart.style.width = heart.style.height = Math.random() * 20 + 10 + "px";
      // Random animation duration
      heart.style.animationDuration = Math.random() * 5 + 5 + "s";
 
      container.appendChild(heart);
 
      // remove after animation
      setTimeout(() => {
        heart.remove();
      }, 10000);
    };
 
    const interval = setInterval(createHeart, 500);
 
    return () => clearInterval(interval);
  }, []);
 
  return <div className="hearts-container"></div>;
};
 
export default HeartsBackground;