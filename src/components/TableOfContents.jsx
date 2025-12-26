/**
 * Table of Contents Component
 * 
 * Automatically generates a table of contents from heading tags
 * Provides smooth scrolling navigation
 */

import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!content) return;

    // Create a temporary div to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = content;

    // Extract headings (h2, h3, h4)
    const headingElements = temp.querySelectorAll('h2, h3, h4');
    
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent;
      const level = parseInt(heading.tagName[1]);
      const id = `heading-${index}`;
      
      return {
        id,
        text,
        level,
      };
    });

    setHeadings(extractedHeadings);

    // Add IDs to actual headings in the DOM
    const articleHeadings = document.querySelectorAll('article h2, article h3, article h4');
    articleHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      rootMargin: '-100px 0px -66%',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          <List className="h-4 w-4" />
          Table of Contents
        </div>
        
        <ul className="space-y-2">
          {headings.map(({ id, text, level }) => (
            <li
              key={id}
              style={{ paddingLeft: `${(level - 2) * 12}px` }}
            >
              <button
                onClick={() => scrollToHeading(id)}
                className={`
                  text-left text-sm transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400
                  ${
                    activeId === id
                      ? 'text-purple-600 dark:text-purple-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }
                `}
              >
                <span className="flex items-start gap-1">
                  {activeId === id && (
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={activeId !== id ? 'ml-5' : ''}>
                    {text}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


