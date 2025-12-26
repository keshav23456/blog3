import React from 'react';

function Logo({ 
  size = "default",
  variant = "full" // "full" | "icon" | "text"
}) {
  const sizes = {
    small: {
      icon: "w-6 h-6",
      text: "text-xl"
    },
    default: {
      icon: "w-8 h-8",
      text: "text-2xl"
    },
    large: {
      icon: "w-10 h-10",
      text: "text-3xl"
    }
  };

  const sizeConfig = sizes[size] || sizes.default;

  // Icon only
  if (variant === "icon") {
    return (
      <div className="relative group">
        <svg 
          className={`${sizeConfig.icon} transition-transform duration-300 group-hover:scale-105`}
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          
          {/* Simple "A" lettermark */}
          <path
            d="M 20 8 L 32 32 L 27 32 L 24 26 L 16 26 L 13 32 L 8 32 Z M 18 22 L 22 22 L 20 14 Z"
            fill="url(#logoGrad)"
          />
        </svg>
      </div>
    );
  }

  // Text only
  if (variant === "text") {
    return (
      <span
        className={`
          ${sizeConfig.text}
          font-bold
          text-foreground
          tracking-tight
          transition-colors duration-200
        `}
        style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
      >
        Apogee
      </span>
    );
  }

  // Full logo (default)
  return (
    <div className="flex items-center gap-2.5 group">
      {/* Icon */}
      <div className="relative">
        <svg 
          className={`${sizeConfig.icon} transition-transform duration-300 group-hover:scale-105`}
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          
          {/* Simple "A" lettermark */}
          <path
            d="M 20 8 L 32 32 L 27 32 L 24 26 L 16 26 L 13 32 L 8 32 Z M 18 22 L 22 22 L 20 14 Z"
            fill="url(#logoGradient)"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span
        className={`
          ${sizeConfig.text}
          font-bold
          text-foreground
          tracking-tight
          transition-colors duration-200
        `}
        style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
      >
        Apogee
      </span>
    </div>
  );
}

export default Logo;
