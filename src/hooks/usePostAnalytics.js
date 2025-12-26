/**
 * usePostAnalytics Hook
 * 
 * React hook for tracking post views and read time
 * Automatically tracks when user views and reads a post
 */

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { analytics } from '../utils/analytics';

export const usePostAnalytics = (postId) => {
  const userData = useSelector((state) => state.auth.userData);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!postId) return;

    // Track view once when post loads
    if (!hasTrackedView.current) {
      analytics.trackView(postId, userData?.$id);
      hasTrackedView.current = true;
    }

    // Start tracking read time
    analytics.startReadTimeTracking();

    // Cleanup: stop tracking when user leaves
    return () => {
      analytics.stopReadTimeTracking(postId, userData?.$id);
    };
  }, [postId, userData]);

  return { analytics };
};


