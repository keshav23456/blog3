import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteprojectid);
    this.account = new Account(this.client);
  }

  async createAccount({email,password,name}) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Update name in user preferences
      

        return this.login({email,password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  // OAuth Authentication Methods
  async loginWithGoogle() {
    try {
      const successURL = `${window.location.origin}/`;
      const failureURL = `${window.location.origin}/login`;
      
      return await this.account.createOAuth2Session(
        'google',
        successURL,
        failureURL
      );
    } catch (error) {
      console.error("Appwrite service :: loginWithGoogle :: error", error);
      throw error;
    }
  }

  async loginWithGithub() {
    try {
      const successURL = `${window.location.origin}/`;
      const failureURL = `${window.location.origin}/login`;
      
      return await this.account.createOAuth2Session(
        'github',
        successURL,
        failureURL
      );
    } catch (error) {
      console.error("Appwrite service :: loginWithGithub :: error", error);
      throw error;
    }
  }

  async loginWithLinkedIn() {
    try {
      const successURL = `${window.location.origin}/`;
      const failureURL = `${window.location.origin}/login`;
      
      return await this.account.createOAuth2Session(
        'linkedin',
        successURL,
        failureURL
      );
    } catch (error) {
      console.error("Appwrite service :: loginWithLinkedIn :: error", error);
      throw error;
    }
  }

  // Check if user came from OAuth redirect
  async handleOAuthCallback() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const secret = urlParams.get('secret');
      
      if (userId && secret) {
        // OAuth session is already created by Appwrite
        return await this.getCurrentUser();
      }
      return null;
    } catch (error) {
      console.error("Appwrite service :: handleOAuthCallback :: error", error);
      return null;
    }
  }

  // Email Verification
  async sendVerificationEmail() {
    try {
      const redirectUrl = `${window.location.origin}/verify-email`;
      return await this.account.createVerification(redirectUrl);
    } catch (error) {
      console.error("Appwrite service :: sendVerificationEmail :: error", error);
      throw error;
    }
  }

  async verifyEmail(userId, secret) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error) {
      console.error("Appwrite service :: verifyEmail :: error", error);
      throw error;
    }
  }

  // Password Reset
  async sendPasswordRecoveryEmail(email) {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      return await this.account.createRecovery(email, redirectUrl);
    } catch (error) {
      console.error("Appwrite service :: sendPasswordRecoveryEmail :: error", error);
      throw error;
    }
  }

  async resetPassword(userId, secret, password, confirmPassword) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        password,
        confirmPassword
      );
    } catch (error) {
      console.error("Appwrite service :: resetPassword :: error", error);
      throw error;
    }
  }

  // Session Management
  async refreshSession() {
    try {
      const session = await this.account.getSession('current');
      if (session) {
        return session;
      }
      return null;
    } catch (error) {
      console.error("Appwrite service :: refreshSession :: error", error);
      return null;
    }
  }

  async getAllSessions() {
    try {
      return await this.account.listSessions();
    } catch (error) {
      console.error("Appwrite service :: getAllSessions :: error", error);
      throw error;
    }
  }

  async deleteSession(sessionId) {
    try {
      return await this.account.deleteSession(sessionId);
    } catch (error) {
      console.error("Appwrite service :: deleteSession :: error", error);
      throw error;
    }
  }

  // User Preferences for Roles
  async getUserPreferences() {
    try {
      return await this.account.getPrefs();
    } catch (error) {
      console.error("Appwrite service :: getUserPreferences :: error", error);
      return {};
    }
  }

  async updateUserPreferences(prefs) {
    try {
      return await this.account.updatePrefs(prefs);
    } catch (error) {
      console.error("Appwrite service :: updateUserPreferences :: error", error);
      throw error;
    }
  }

  async setUserRole(role) {
    try {
      return await this.updateUserPreferences({ role });
    } catch (error) {
      console.error("Appwrite service :: setUserRole :: error", error);
      throw error;
    }
  }

  async getUserRole() {
    try {
      const prefs = await this.getUserPreferences();
      return prefs.role || 'author'; // Default role for authenticated users
    } catch (error) {
      console.error("Appwrite service :: getUserRole :: error", error);
      return 'author'; // Default to author on error
    }
  }
}

const authService = new AuthService();
export default authService;
