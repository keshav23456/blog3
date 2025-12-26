/**
 * Author Dashboard
 * 
 * Shows analytics and insights for an author's posts
 * - Total views, unique visitors, avg read time
 * - List of posts with individual analytics
 * - Performance metrics
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container } from '../components';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, Users, Clock, FileText, TrendingUp, Edit } from 'lucide-react';
import { PostCardSkeleton } from '../components/skeletons/PostCardSkeleton';

export default function AuthorDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const { userRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Only authors and admins can access
    if (!userData || (userRole !== 'author' && userRole !== 'admin')) {
      navigate('/');
      return;
    }

    fetchAnalytics();
  }, [userData, userRole, navigate]);

  const fetchAnalytics = async () => {
    if (!userData?.$id) return;

    try {
      setIsLoading(true);
      const data = await appwriteService.getAuthorAnalytics(userData.$id);
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Your Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your content performance
              </p>
            </div>
            <Button onClick={() => navigate('/add-post')} className="gap-2">
              <Edit className="h-4 w-4" />
              New Post
            </Button>
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
                  {analytics.totalUniqueVisitors.toLocaleString()}
                </div>
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
              </CardContent>
            </Card>
          </div>

          {/* Posts Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Your Posts</CardTitle>
              <CardDescription>Performance metrics for each post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.posts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      You haven't published any posts yet
                    </p>
                    <Button onClick={() => navigate('/add-post')}>
                      Create Your First Post
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Title
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Views
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Unique
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Avg Read
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.posts
                          .sort((a, b) => b.analytics.views - a.analytics.views)
                          .map((post) => (
                            <tr
                              key={post.$id}
                              className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <td className="py-3 px-4">
                                <a
                                  href={`/post/${post.$id}`}
                                  className="font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                >
                                  {post.title}
                                </a>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    post.status === 'active'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                  }`}
                                >
                                  {post.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                                {post.analytics.views}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                                {post.analytics.uniqueVisitors}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                                {formatReadTime(post.analytics.avgReadTime)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Post */}
          {analytics.posts.length > 0 && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Top Performing Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const topPost = analytics.posts.reduce((prev, current) =>
                    current.analytics.views > prev.analytics.views ? current : prev
                  );
                  return (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                          {topPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topPost.analytics.views} views • {topPost.analytics.uniqueVisitors} unique
                          visitors
                        </p>
                      </div>
                      <Button onClick={() => navigate(`/post/${topPost.$id}`)}>View Post</Button>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}


