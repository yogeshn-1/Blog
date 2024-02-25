import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";

export class DBService {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost({ title, content, image, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return { error: error.message };
    }
  }

  async updatePost(docId, { title, content, image, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        docId,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return { error: error.message };
    }
  }

  async deletePost(docId) {
    try {
      return await this.database.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        docId
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(docId) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        docId
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getAllpost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPost :: error", error);
    }
  }

  async getUserPost(userId) {
    try {
      console.log(userId);
      return await this.database.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPost :: error", error);
    }
  }
}

const dbServices = new DBService();

export default dbServices;
