/**
 * Reading Progress Bar Component
 * 
 * Shows a progress bar at the top of the page indicating
 * how much of the article has been read
 */

import React, { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress);
    
    // Initial update
    updateProgress();

    // Cleanup
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-50 transition-all duration-150"
      style={{
        width: `${progress}%`,
        opacity: progress > 0 ? 1 : 0,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Reading progress"
    />
  );
}


