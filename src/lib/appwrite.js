import { Account, Client, Storage, TablesDB } from "appwrite";
import { appwriteConfig } from "../../constants";

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const database = new TablesDB(client)
export const storage = new Storage(client)

export const DB_ID = appwriteConfig.databaseId
export const IMAGES_COLLECTION_ID = appwriteConfig.imagesCollectionId
export const BUCKET_ID = appwriteConfig.bucketId

export default client
