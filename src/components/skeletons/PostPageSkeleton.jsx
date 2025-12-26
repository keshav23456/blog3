import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const PostPageSkeleton = () => {
  return (
    <div className="section-container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Featured Image Skeleton */}
        <Skeleton className="w-full h-96 rounded-2xl" />
        
        {/* Title Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
        </div>
        
        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        
        <div className="border-t border-border my-8" />
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - (i % 3) * 15}%` }} />
          ))}
        </div>
        
        <div className="space-y-4 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - (i % 2) * 20}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPageSkeleton;


