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



// import React, { useState, useEffect } from 'react';

// const HeartAnimations = () => {
//   const [showWelcome, setShowWelcome] = useState(true);

//   useEffect(() => {
//     // 2 seconds = 2000ms
//     const timer = setTimeout(() => {
//       setShowWelcome(false);
//     }, 2000); // 2 seconds

//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <>
//       {/* Pulsing heart animation in bottom-left (moved from right) */}
//       <div className="fixed bottom-5 left-0 w-56 h-56 pointer-events-none z-50">
//         <div className="relative w-full h-full flex items-center justify-center">
          
//           {/* Large central heart with pulse */}
//           <div className="absolute text-8xl text-red-500 animate-pulse">
//             ❤️
//           </div>
          
//           {/* Orbiting smaller hearts */}
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-2xl"
//               style={{
//                 color: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ff9999'][i % 4],
//                 transformOrigin: '50% 50%',
//                 animation: `orbitHearts ${6 + i * 0.5}s linear infinite`,
//                 animationDelay: `${i * 0.4}s`
//               }}
//             >
//               💖
//             </div>
//           ))}
          
//           {/* Sparkling hearts */}
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={`sparkle-${i}`}
//               className="absolute text-lg"
//               style={{
//                 color: '#ffd700',
//                 top: `${20 + Math.random() * 60}%`,
//                 left: `${20 + Math.random() * 60}%`,
//                 animation: `sparkleHearts ${2 + Math.random() * 3}s infinite ease-in-out`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             >
//               💛
//             </div>
//           ))}
          
//           {/* Heart burst effect */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             {[...Array(12)].map((_, i) => (
//               <div
//                 key={`burst-${i}`}
//                 className="absolute text-sm text-pink-300"
//                 style={{
//                   transform: `rotate(${i * 30}deg)`,
//                   transformOrigin: '50% 50%',
//                   animation: `heartBurst 4s infinite ease-in-out`,
//                   animationDelay: `${i * 0.1}s`
//                 }}
//               >
//                 💗
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Floating hearts animation in bottom-right (moved from left) */}
//       <div className="fixed bottom-0 right-0 w-80 h-80 pointer-events-none z-50 overflow-hidden">
//         <div className="relative w-full h-full">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-red-400 opacity-70"
//               style={{
//                 right: `${Math.random() * 250}px`,
//                 bottom: `${Math.random() * 100}px`,
//                 fontSize: `${16 + Math.random() * 20}px`,
//                 animation: `floatingHearts ${4 + Math.random() * 6}s infinite ease-in-out`,
//                 animationDelay: `${Math.random() * 3}s`
//               }}
//             >
//               ❤️
//             </div>
//           ))}
          
//           {/* Additional pink hearts */}
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={`pink-${i}`}
//               className="absolute text-pink-400 opacity-60"
//               style={{
//                 right: `${Math.random() * 250}px`,
//                 bottom: `${Math.random() * 100}px`,
//                 fontSize: `${12 + Math.random() * 16}px`,
//                 animation: `floatingHearts ${3 + Math.random() * 4}s infinite ease-in-out`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             >
//               💕
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Welcome Message with Hearts - Shows for 2 minutes */}
//       {showWelcome && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
//           <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 rounded-full shadow-2xl animate-bounce">
//             <div className="flex items-center gap-4 text-3xl font-bold">
//               <span className="animate-pulse text-4xl">💖</span>
//               <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
//                 Welcome!
//               </span>
//               <span className="animate-pulse text-4xl">💖</span>
//             </div>
//           </div>
          
//           {/* Welcome hearts floating around */}
//           <div className="absolute inset-0">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute text-2xl"
//                 style={{
//                   color: '#ffb3d9',
//                   top: `${-40 + Math.random() * 80}px`,
//                   left: `${-60 + Math.random() * 300}px`,
//                   animation: `welcomeHearts ${3 + Math.random() * 2}s infinite ease-in-out`,
//                   animationDelay: `${i * 0.3}s`
//                 }}
//               >
//                 💝
//               </div>
//             ))}
//           </div>
          
//           {/* Countdown timer display (optional - shows remaining time) */}
//           <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-300 text-sm font-medium opacity-70">
//             <div className="bg-black bg-opacity-30 px-3 py-1 rounded-full">
//               💕 Enjoy the hearts! 💕
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes floatingHearts {
//           0% { 
//             transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
//             opacity: 0; 
//           }
//           10% { 
//             opacity: 0.8; 
//           }
//           90% { 
//             opacity: 0.8; 
//           }
//           100% { 
//             transform: translateY(-200px) translateX(-50px) scale(1.5) rotate(-20deg); 
//             opacity: 0; 
//           }
//         }
        
//         @keyframes orbitHearts {
//           from {
//             transform: rotate(0deg) translateX(100px) rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg) translateX(100px) rotate(-360deg);
//           }
//         }
        
//         @keyframes sparkleHearts {
//           0%, 100% { 
//             transform: scale(0.5) rotate(0deg); 
//             opacity: 0.3; 
//           }
//           50% { 
//             transform: scale(1.2) rotate(180deg); 
//             opacity: 1; 
//           }
//         }
        
//         @keyframes heartBurst {
//           0%, 90% { 
//             transform: rotate(var(--rotation)) translateY(0px) scale(0.3); 
//             opacity: 0; 
//           }
//           50% { 
//             transform: rotate(var(--rotation)) translateY(-60px) scale(1); 
//             opacity: 1; 
//           }
//           100% { 
//             transform: rotate(var(--rotation)) translateY(-100px) scale(0.3); 
//             opacity: 0; 
//           }
//         }
        
//         @keyframes welcomeHearts {
//           0%, 100% { 
//             transform: translateY(0px) scale(0.8); 
//             opacity: 0.4; 
//           }
//           50% { 
//             transform: translateY(-20px) scale(1.2); 
//             opacity: 1; 
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default HeartAnimations;