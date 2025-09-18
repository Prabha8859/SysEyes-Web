// src/components/BackgroundMusic.js
import { useEffect } from "react";
import bgMusic from "../../assets/music/Bg_musics.mp3";

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = document.getElementById("bg-music");

    const enableAudio = () => {
      if (audio) {
        audio.muted = false;
        audio.play().catch((err) => {
          console.log("Autoplay blocked:", err);
        });
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  return (
    <audio id="bg-music" autoPlay loop muted>
      <source src={bgMusic} type="audio/mp3" />
    </audio>
  );
};

export default BackgroundMusic;
