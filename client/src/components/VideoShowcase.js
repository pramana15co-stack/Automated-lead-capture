import React, { useState } from 'react';

/**
 * Video Showcase Component
 * Supports YouTube, Vimeo, or direct video upload
 * 
 * Usage:
 * - YouTube: <VideoShowcase videoUrl="https://www.youtube.com/watch?v=VIDEO_ID" />
 * - Vimeo: <VideoShowcase videoUrl="https://vimeo.com/VIDEO_ID" />
 * - Direct: <VideoShowcase videoUrl="https://yourdomain.com/video.mp4" />
 */
const VideoShowcase = ({ 
  videoUrl, 
  title = "See How It Works",
  description = "Watch our automation system in action",
  thumbnail = null,
  autoplay = false,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Detect video platform
  const getVideoType = (url) => {
    if (!url) return null;
    
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return 'youtube';
    } else if (url.includes('vimeo.com/')) {
      return 'vimeo';
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return 'direct';
    }
    return null;
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Extract Vimeo video ID
  const getVimeoId = (url) => {
    const match = url.match(/vimeo.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const videoType = getVideoType(videoUrl);

  const renderVideo = () => {
    if (!videoUrl) {
      return (
        <div className="video-placeholder">
          <div className="video-placeholder-content">
            <div className="video-placeholder-icon">🎥</div>
            <p>Video URL not configured</p>
            <small>Add your video URL in the component props</small>
          </div>
        </div>
      );
    }

    switch (videoType) {
      case 'youtube': {
        const videoId = getYouTubeId(videoUrl);
        const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
        
        return (
          <div className="video-container">
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        );
      }

      case 'vimeo': {
        const videoId = getVimeoId(videoUrl);
        const embedUrl = `https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`;
        
        return (
          <div className="video-container">
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        );
      }

      case 'direct': {
        return (
          <div className="video-container">
            <video
              controls
              className="video-direct"
              poster={thumbnail}
              autoPlay={autoplay}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      default:
        return (
          <div className="video-placeholder">
            <div className="video-placeholder-content">
              <div className="video-placeholder-icon">⚠️</div>
              <p>Invalid video URL format</p>
              <small>Please use YouTube, Vimeo, or direct video link</small>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`video-showcase ${className}`}>
      <div className="video-showcase-header">
        <h3 className="video-showcase-title">{title}</h3>
        {description && (
          <p className="video-showcase-description">{description}</p>
        )}
      </div>
      {renderVideo()}
    </div>
  );
};

export default VideoShowcase;


