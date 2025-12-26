import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="card-elevated p-6 space-y-4">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-48 rounded-lg" />
      
      {/* Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      
      {/* Content Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      {/* Meta Skeleton */}
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
};

export const PostCardSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostCardSkeleton;


