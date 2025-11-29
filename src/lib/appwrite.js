import { Account, Client, TablesDB } from "appwrite";

export const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client)
export const database = new TablesDB(client)

export const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
export const IMAGES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_IMAGES_COLLECTION_ID

export default client
