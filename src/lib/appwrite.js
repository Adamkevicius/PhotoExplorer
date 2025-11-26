import { Account, Client, OAuthProvider } from "appwrite";
import { appwriteConfig } from "../../constants";

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client)

export default client

export { OAuthProvider };

