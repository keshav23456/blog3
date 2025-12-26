const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwritecollectionid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwritebucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  // Analytics Collections
  appwriteAnalyticsCollectionId: String(import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || ""),
  appwriteReadTimeCollectionId: String(import.meta.env.VITE_APPWRITE_READTIME_COLLECTION_ID || ""),
  appwriteEngagementCollectionId: String(import.meta.env.VITE_APPWRITE_ENGAGEMENT_COLLECTION_ID || ""),
  // Comments Collection
  appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID || ""),
};

export default conf;

//used bcoz we dont want enc to omport key agai and again
