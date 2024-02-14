import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

export class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: fileUpload :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketID, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketID, fileId);
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
    }
  }
}

const fileServices = new FileService();

export default fileServices;
