/**
 * Social Share Component
 * 
 * Provides buttons to share content on various social media platforms
 * Supports: Twitter, Facebook, LinkedIn, Reddit, Copy Link
 */

import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
  Mail,
} from 'lucide-react';

export default function SocialShare({ 
  url = window.location.href,
  title = document.title,
  description = '',
  variant = 'default' // 'default', 'compact', 'floating'
}) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  if (variant === 'floating') {
    return (
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.facebook, '_blank')}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.linkedin, '_blank')}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Copy link"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="relative inline-block">
        <Button
          variant="ghost"
          size="sm"
          onClick={shareNative}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        {showMenu && (
          <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-2 flex gap-2 z-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(shareLinks.twitter, '_blank')}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(shareLinks.facebook, '_blank')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Default variant - full buttons
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        className="gap-2"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        className="gap-2"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        className="gap-2"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.email, '_blank')}
        className="gap-2"
      >
        <Mail className="h-4 w-4" />
        Email
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}


