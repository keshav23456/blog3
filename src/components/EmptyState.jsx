import React from 'react';
import { FileText, Search, AlertCircle, PenSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const EmptyState = ({ 
  type = 'noPosts',
  title,
  description,
  action,
  actionLabel,
  icon: CustomIcon 
}) => {
  // Default configurations
  const configs = {
    noPosts: {
      icon: FileText,
      title: 'No posts yet',
      description: 'Be the first to share your thoughts with the world.',
      actionLabel: 'Create your first post',
      action: '/add-post'
    },
    noSearchResults: {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search terms or filters.',
      actionLabel: 'Clear filters',
      action: null
    },
    noUserPosts: {
      icon: PenSquare,
      title: 'You haven\'t written any posts',
      description: 'Start sharing your ideas and stories with the community.',
      actionLabel: 'Write your first post',
      action: '/add-post'
    },
    error: {
      icon: AlertCircle,
      title: 'Something went wrong',
      description: 'We couldn\'t load the content. Please try again.',
      actionLabel: 'Reload page',
      action: () => window.location.reload()
    },
    noUsers: {
      icon: Users,
      title: 'No users found',
      description: 'There are no users matching your criteria.',
      actionLabel: null,
      action: null
    }
  };

  const config = configs[type] || configs.noPosts;
  const Icon = CustomIcon || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalActionLabel = actionLabel || config.actionLabel;
  const finalAction = action !== undefined ? action : config.action;

  const handleAction = () => {
    if (typeof finalAction === 'function') {
      finalAction();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
        <div className="relative w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <Icon className="w-10 h-10 text-muted-foreground" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-foreground mb-2 text-center">
        {finalTitle}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {finalDescription}
      </p>

      {/* Action Button */}
      {finalActionLabel && (
        typeof finalAction === 'string' ? (
          <Link to={finalAction}>
            <Button size="lg" className="gap-2">
              <PenSquare className="w-4 h-4" />
              {finalActionLabel}
            </Button>
          </Link>
        ) : finalAction && (
          <Button onClick={handleAction} size="lg" className="gap-2">
            {finalActionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;


