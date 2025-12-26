/**
 * SEO Component
 * 
 * Manages meta tags for SEO optimization
 * - OpenGraph tags for social sharing
 * - Twitter Card tags
 * - Canonical URLs
 * - Dynamic meta tags based on page content
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title = 'Apogee | Modern Blogging Platform',
  description = 'Discover insightful articles, stories, and ideas from talented writers on Apogee - a modern blogging platform.',
  image = null,
  article = false,
  author = null,
  publishedTime = null,
  modifiedTime = null,
  tags = [],
  canonical = null,
}) => {
  const location = useLocation();
  const siteUrl = window.location.origin;
  const pageUrl = canonical || `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, content, attribute = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attr, value] = selector.replace(/\[|\]/g, '').split('=');
        element.setAttribute(attr.replace(/"/g, ''), value.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', tags.join(', '));

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', pageUrl);

    // OpenGraph tags
    updateMetaTag('meta[property="og:type"]', article ? 'article' : 'website');
    updateMetaTag('meta[property="og:url"]', pageUrl);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:site_name"]', 'Apogee');

    if (image) {
      updateMetaTag('meta[property="og:image"]', image);
      updateMetaTag('meta[property="og:image:secure_url"]', image);
      updateMetaTag('meta[property="og:image:alt"]', title);
    }

    // Article-specific OpenGraph tags
    if (article) {
      if (author) {
        updateMetaTag('meta[property="article:author"]', author);
      }
      if (publishedTime) {
        updateMetaTag('meta[property="article:published_time"]', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('meta[property="article:modified_time"]', modifiedTime);
      }
      tags.forEach((tag, index) => {
        updateMetaTag(`meta[property="article:tag"][content="${tag}"]`, tag);
      });
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', image ? 'summary_large_image' : 'summary');
    updateMetaTag('meta[name="twitter:url"]', pageUrl);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', image);
      updateMetaTag('meta[name="twitter:image:alt"]', title);
    }

    // JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': article ? 'Article' : 'WebPage',
      headline: title,
      description: description,
      url: pageUrl,
      ...(image && { image: image }),
      ...(article && author && { author: { '@type': 'Person', name: author } }),
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);
  }, [title, description, image, article, author, publishedTime, modifiedTime, tags, pageUrl]);

  return null; // This component doesn't render anything
};

export default SEO;


