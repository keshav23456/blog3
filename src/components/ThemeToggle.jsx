import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-muted hover:bg-accent
        text-muted-foreground hover:text-accent-foreground
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        dark:focus:ring-offset-background
        group
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <Sun
        className={`
          absolute w-5 h-5 transition-all duration-300
          ${theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-0'
          }
        `}
      />
      
      {/* Moon Icon (Dark Mode) */}
      <Moon
        className={`
          absolute w-5 h-5 transition-all duration-300
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0'
          }
        `}
      />
      
      {/* Hover Effect */}
      <span className="absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
    </button>
  );
};

export default ThemeToggle;


