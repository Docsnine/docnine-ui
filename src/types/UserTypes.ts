export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  provider?: "email" | "github" | "google";
  githubConnected?: boolean;
  githubUsername?: string;
  googleId?: string;
  googleUsername?: string;
  role?: "user" | "super-admin";
  createdAt: string;
}
