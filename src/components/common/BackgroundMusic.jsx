// src/components/BackgroundMusic.js
import { useEffect, useRef, useState } from "react";
import music1 from "../../assets/music/Bg_musics.mp3";
import music2 from "../../assets/music/Run-Amokchosic.com.mp3";
import music3 from "../../assets/music/sad-violin-150146.mp3";
import "./BackgroundMusic.css";

const tracks = [
  { label: "Romantic", src: music1, emoji: "💕" },
  { label: "Funny", src: music2, emoji: "😄" },
  { label: "Sad", src: music3, emoji: "😢" },
];

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enable autoplay on first user interaction
  useEffect(() => {
    const audio = audioRef.current;

    const enableAudio = () => {
      if (audio && !isInitialized) {
        audio.muted = false;
        audio.play().then(() => {
          setIsPlaying(true);
          setIsInitialized(true);
        }).catch((err) => {
          console.log("Autoplay blocked:", err);
          setIsInitialized(true);
        });
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, [isInitialized]);

  // Handle track change properly by using .load()
  const handleTrackChange = (newIndex) => {
    const audio = audioRef.current;
    if (audio) {
      const wasPlaying = isPlaying;
      audio.pause();
      audio.src = tracks[newIndex].src;
      audio.load();
      
      if (wasPlaying) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Error playing new track:", err);
          setIsPlaying(false);
        });
      }
      
      setSelectedTrackIndex(newIndex);
    }
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Error playing:", err);
      });
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleUnmute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const handlePrevious = () => {
    const newIndex = selectedTrackIndex > 0 ? selectedTrackIndex - 1 : tracks.length - 1;
    handleTrackChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedTrackIndex < tracks.length - 1 ? selectedTrackIndex + 1 : 0;
    handleTrackChange(newIndex);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        muted
        onEnded={() => setIsPlaying(false)}
      >
        <source src={tracks[selectedTrackIndex].src} type="audio/mp3" />
      </audio>

      <div className={`music-player-container ${isExpanded ? 'expanded' : ''}`}>
        {/* Main Music Circle */}
        <div className="music-circle" onClick={toggleExpanded}>
          <div className={`music-icon ${isPlaying ? 'playing' : ''}`}>
            <i className="icofont-music-notes"></i>
          </div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring-2"></div>
          
          {/* Current Track Indicator */}
          <div className="track-indicator">
            <span className="track-emoji">{tracks[selectedTrackIndex].emoji}</span>
          </div>
        </div>

        {/* Expanded Controls */}
        <div className={`controls-panel ${isExpanded ? 'show' : ''}`}>
          {/* Track Selection */}
          <div className="track-selection">
            <h4>Choose Your Mood</h4>
            <div className="track-options">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  className={`track-btn ${index === selectedTrackIndex ? 'active' : ''}`}
                  onClick={() => handleTrackChange(index)}
                  title={track.label}
                >
                  <span className="track-emoji">{track.emoji}</span>
                  <span className="track-label">{track.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="playback-controls">
            {/* <button 
              className="control-btn" 
              onClick={handlePrevious}
              title="Previous Track"
            >
              <i className="icofont-previous"></i>
            </button> */}

            <button 
              className="control-btn main-play-btn" 
              onClick={isPlaying ? handlePause : handlePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <i className="icofont-ui-pause"></i>
              ) : (
                <i className="icofont-ui-play"></i>
              )}
            </button>

            {/* <button 
              className="control-btn" 
              onClick={handleNext}
              title="Next Track"
            >
              <i className="icofont-next"></i>
            </button> */}

            <button 
              className="control-btn" 
              onClick={isMuted ? handleUnmute : handleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <i className="icofont-volume-mute"></i>
              ) : (
                <i className="icofont-volume-up"></i>
              )}
            </button>
          </div>

          {/* Current Track Info */}
          <div className="current-track-info">
            <div className="track-name">
              {tracks[selectedTrackIndex].emoji} {tracks[selectedTrackIndex].label}
            </div>
            <div className="track-status">
              {isPlaying ? (
                <span className="playing-indicator">
                  <div className="sound-wave">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  Now Playing
                </span>
              ) : (
                <span className="paused-indicator">Paused</span>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button className="close-btn" onClick={() => setIsExpanded(false)}>
            <i className="icofont-close"></i>
          </button>
        </div>

        {/* Overlay for closing when clicking outside */}
        {isExpanded && (
          <div 
            className="overlay" 
            onClick={() => setIsExpanded(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default BackgroundMusic;