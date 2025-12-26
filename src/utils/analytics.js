/**
 * Analytics Utilities
 * 
 * Client-side analytics tracking for blog posts
 * Tracks views, read time, and user engagement
 */

import appwriteService from '../appwrite/config';

class Analytics {
  constructor() {
    this.startTime = null;
    this.isTracking = false;
    this.visitorId = this.getOrCreateVisitorId();
  }

  /**
   * Generate or retrieve unique visitor ID
   * Stored in localStorage for tracking unique visitors
   */
  getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('apogee_visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('apogee_visitor_id', visitorId);
    }
    return visitorId;
  }

  /**
   * Track post view
   * Called when user opens a post
   */
  async trackView(postId, userId = null) {
    try {
      // Check if already viewed in this session
      const sessionKey = `viewed_${postId}`;
      if (sessionStorage.getItem(sessionKey)) {
        return; // Don't double-count in same session
      }

      await appwriteService.trackPostView(postId, {
        visitorId: this.visitorId,
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      // Mark as viewed in this session
      sessionStorage.setItem(sessionKey, 'true');
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }

  /**
   * Start tracking read time
   * Called when user starts reading a post
   */
  startReadTimeTracking() {
    this.startTime = Date.now();
    this.isTracking = true;
  }

  /**
   * Stop tracking and save read time
   * Called when user leaves the post
   */
  async stopReadTimeTracking(postId, userId = null) {
    if (!this.isTracking || !this.startTime) return;

    const readTime = Math.floor((Date.now() - this.startTime) / 1000); // seconds
    this.isTracking = false;
    this.startTime = null;

    // Only track if user spent at least 10 seconds
    if (readTime < 10) return;

    try {
      await appwriteService.trackReadTime(postId, {
        visitorId: this.visitorId,
        userId,
        readTime,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking read time:', error);
    }
  }

  /**
   * Calculate estimated read time based on content
   * Average reading speed: 200-250 words per minute
   */
  calculateEstimatedReadTime(content) {
    const wordsPerMinute = 225;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  }

  /**
   * Track user engagement events
   * Like, share, comment, etc.
   */
  async trackEngagement(postId, eventType, userId = null) {
    try {
      await appwriteService.trackEngagement(postId, {
        visitorId: this.visitorId,
        userId,
        eventType,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();

/**
 * React hook for easy analytics integration
 */
export const useAnalytics = () => {
  return analytics;
};

