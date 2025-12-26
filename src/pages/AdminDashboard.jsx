/**
 * Admin Dashboard
 * 
 * Platform-wide analytics and management for admins
 * - Total posts, views, unique visitors
 * - Popular posts
 * - User management
 * - Content moderation
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container } from '../components';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, Users, Clock, FileText, TrendingUp, Shield } from 'lucide-react';
import { PostCardSkeleton } from '../components/skeletons/PostCardSkeleton';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const { userRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Only admins can access
    if (!userData || userRole !== 'admin') {
      navigate('/');
      return;
    }

    fetchAnalytics();
  }, [userData, userRole, navigate]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await appwriteService.getPlatformAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatReadTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <Container>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <Shield className="h-10 w-10 text-purple-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Platform-wide analytics and insights
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics.totalPosts}
                </div>
                <p className="text-xs text-gray-500 mt-1">Published on the platform</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Views
                </CardTitle>
                <Eye className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">All-time page views</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Unique Visitors
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics.uniqueVisitors.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">Distinct users</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Read Time
                </CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatReadTime(analytics.avgReadTime)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Average engagement</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Posts */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Top 10 Popular Posts
              </CardTitle>
              <CardDescription>Most viewed posts on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.popularPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No posts available yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analytics.popularPosts.map((item, index) => (
                    <div
                      key={item.postId}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.post?.title || 'Untitled Post'}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {item.viewCount} views
                            </span>
                            {item.post?.status && (
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  item.post.status === 'active'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                }`}
                              >
                                {item.post.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => item.post && navigate(`/post/${item.postId}`)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Platform Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics.totalPosts > 0
                    ? Math.round((analytics.totalViews / analytics.totalPosts) * 100) / 100
                    : 0}{' '}
                  views/post
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Average views per post
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Visitor Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.uniqueVisitors > 0
                    ? Math.round((analytics.totalViews / analytics.uniqueVisitors) * 100) / 100
                    : 0}{' '}
                  pages/visitor
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Average pages per unique visitor
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}


