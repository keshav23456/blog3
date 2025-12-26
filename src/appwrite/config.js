import conf from "../conf/conf.js";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class AppwriteService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteprojectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimages, status, userId, tags = [] }) {
    console.log(userId);
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, featuredimages, status, userId, tags: Array.isArray(tags) ? tags : [] }
      );
    } catch (error) {
      console.error("Error in createPost:", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredimages, status, tags = [] }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, featuredimages, status, tags: Array.isArray(tags) ? tags : [] }
      );
    } catch (error) {
      console.error("Error in updatePost:", error);
      throw error;
    }
  }
  

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
      return { success: true };
    } catch (error) {
      console.error("Error in deletePost:", error);
      return { success: false, error };
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
    } catch (error) {
      console.error("Error in getPost:", error);
      return { success: false, error };
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        queries
      );
    } catch (error) {
      console.error("Error in getPosts:", error);
      return { success: false, error };
    }
  }

  // File Upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error in uploadFile:", error);
      return { success: false, error };
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketid, fileID);
      return { success: true };
    } catch (error) {
      console.error("Error in deleteFile:", error);
      return { success: false, error };
    }
  }

  async getFilePreview(fileId) {
    try {
      if (!fileId) {
        console.error("No file ID provided to getFilePreview");
        return null;
      }
      return this.bucket.getFileView(conf.appwritebucketid, fileId);
    } catch (error) {
      console.error("Error in getFilePreview:", error);
      return null;
    }
  }

  // Analytics Methods
  async trackPostView(postId, viewData) {
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwriteAnalyticsCollectionId, // Views collection
        ID.unique(),
        {
          postId,
          visitorId: viewData.visitorId,
          userId: viewData.userId || null,
          timestamp: viewData.timestamp,
          userAgent: viewData.userAgent,
        }
      );
    } catch (error) {
      console.error("Error tracking view:", error);
      throw error;
    }
  }

  async trackReadTime(postId, readTimeData) {
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwriteReadTimeCollectionId, // Read time collection
        ID.unique(),
        {
          postId,
          visitorId: readTimeData.visitorId,
          userId: readTimeData.userId || null,
          readTime: readTimeData.readTime,
          timestamp: readTimeData.timestamp,
        }
      );
    } catch (error) {
      console.error("Error tracking read time:", error);
      throw error;
    }
  }

  async trackEngagement(postId, engagementData) {
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwriteEngagementCollectionId, // Engagement collection
        ID.unique(),
        {
          postId,
          visitorId: engagementData.visitorId,
          userId: engagementData.userId || null,
          eventType: engagementData.eventType,
          timestamp: engagementData.timestamp,
        }
      );
    } catch (error) {
      console.error("Error tracking engagement:", error);
      throw error;
    }
  }

  // Get analytics for a specific post
  async getPostAnalytics(postId) {
    try {
      // Get view count
      const views = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwriteAnalyticsCollectionId,
        [Query.equal("postId", postId)]
      );

      // Get unique visitors
      const uniqueVisitors = new Set(views.documents.map(v => v.visitorId)).size;

      // Get average read time
      const readTimes = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwriteReadTimeCollectionId,
        [Query.equal("postId", postId)]
      );

      const avgReadTime = readTimes.documents.length > 0
        ? readTimes.documents.reduce((sum, rt) => sum + rt.readTime, 0) / readTimes.documents.length
        : 0;

      return {
        views: views.total,
        uniqueVisitors,
        avgReadTime: Math.round(avgReadTime),
        readTimeData: readTimes.documents,
      };
    } catch (error) {
      console.error("Error getting post analytics:", error);
      return { views: 0, uniqueVisitors: 0, avgReadTime: 0 };
    }
  }

  // Get analytics for author's posts
  async getAuthorAnalytics(userId) {
    try {
      // Get all author's posts
      const posts = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        [Query.equal("userId", userId)]
      );

      // Get analytics for each post
      const postsWithAnalytics = await Promise.all(
        posts.documents.map(async (post) => {
          const analytics = await this.getPostAnalytics(post.$id);
          return {
            ...post,
            analytics,
          };
        })
      );

      // Calculate totals
      const totalViews = postsWithAnalytics.reduce((sum, p) => sum + p.analytics.views, 0);
      const totalUniqueVisitors = postsWithAnalytics.reduce((sum, p) => sum + p.analytics.uniqueVisitors, 0);
      const avgReadTime = postsWithAnalytics.length > 0
        ? postsWithAnalytics.reduce((sum, p) => sum + p.analytics.avgReadTime, 0) / postsWithAnalytics.length
        : 0;

      return {
        totalPosts: posts.documents.length,
        totalViews,
        totalUniqueVisitors,
        avgReadTime: Math.round(avgReadTime),
        posts: postsWithAnalytics,
      };
    } catch (error) {
      console.error("Error getting author analytics:", error);
      return { totalPosts: 0, totalViews: 0, totalUniqueVisitors: 0, avgReadTime: 0, posts: [] };
    }
  }

  // Get overall platform analytics (for admin)
  async getPlatformAnalytics() {
    try {
      // Get all posts
      const posts = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        [Query.limit(100)]
      );

      // Get all views
      const views = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwriteAnalyticsCollectionId,
        [Query.limit(5000)]
      );

      // Get unique visitors
      const uniqueVisitors = new Set(views.documents.map(v => v.visitorId)).size;

      // Get read times
      const readTimes = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwriteReadTimeCollectionId,
        [Query.limit(5000)]
      );

      const avgReadTime = readTimes.documents.length > 0
        ? readTimes.documents.reduce((sum, rt) => sum + rt.readTime, 0) / readTimes.documents.length
        : 0;

      // Get popular posts (most viewed)
      const postViews = {};
      views.documents.forEach(view => {
        postViews[view.postId] = (postViews[view.postId] || 0) + 1;
      });

      const popularPosts = Object.entries(postViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([postId, viewCount]) => ({
          postId,
          viewCount,
          post: posts.documents.find(p => p.$id === postId),
        }));

      return {
        totalPosts: posts.total,
        totalViews: views.total,
        uniqueVisitors,
        avgReadTime: Math.round(avgReadTime),
        popularPosts,
      };
    } catch (error) {
      console.error("Error getting platform analytics:", error);
      return { totalPosts: 0, totalViews: 0, uniqueVisitors: 0, avgReadTime: 0, popularPosts: [] };
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
