import React, { useEffect } from 'react'
import BannerSection from '../banner/BannerSection'
import MemberSection from '../members/MemberSection'
import AboutSection from '../about/AboutSection'
import WorkSection from '../works/WorkSection'
import StorySection from '../story/StorySection'
import GroupSection from '../group/GroupSection'
import ReviewSection from '../reviews/ReviewSection'
import AppSection from '../app/AppSection'


const Home = () => {
  useEffect(() => {
      const heartContainer = document.getElementById("abcdhearts");
      const interval = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = Math.random() * 5 + 3 + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
      }, 500);
  
      return () => clearInterval(interval);
    }, []);
  return (
    <>
      <BannerSection />
        <MemberSection/>
        <AboutSection />
        <WorkSection />
        <StorySection />
        <GroupSection />
        <ReviewSection />
        <AppSection />
        <div id="abcdhearts"></div>
    </>
  )
}

export default Home