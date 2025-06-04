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

  async createPost({ title, slug, content, featuredimages, status, userId }) {
    console.log(userId);
    try {
      //mongodb kar deneg if koi issue huya to 
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug, //document id hota hai but
        //id.unique bhi hota hai
        { title, content, featuredimages, status, userId }
        
      );
    } catch (error) {
      console.error("Error in createPost:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, featuredImage, status }
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
}

const appwriteService = new AppwriteService();
export default appwriteService;
