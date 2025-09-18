import React, { useEffect, useRef } from "react";
import './CursorFollower.css'; // Import the CSS

const CursorFollower = () => {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Add class to body
    document.body.classList.add("cursor-follower-enabled");

    const dot = dotRef.current;
    const trail = trailRef.current;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Move head dot instantly
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const animateTrail = () => {
      const ease = 0.1; // trail speed
      trailX += (mouseX - trailX) * ease;
      trailY += (mouseY - trailY) * ease;
      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateTrail();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove("cursor-follower-enabled");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={trailRef} className="cursor-dot-trail" />
    </>
  );
};

export default CursorFollower;
