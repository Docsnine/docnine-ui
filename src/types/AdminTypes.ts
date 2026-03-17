export interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  newUsersLast30Days: number;
  newProjectsLast30Days: number;
  planBreakdown: Record<string, number>;
  estimatedMRR: number;
  paidSubscriptions: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  createdAt: string;
  subscription: { plan: string; status: string; billingCycle?: string | null };
}

export interface AdminProject {
  _id: string;
  name: string;
  repoOwner: string;
  repoName: string;
  createdAt: string;
  userId: { _id: string; name: string; email: string } | null;
}

export interface AdminSubscription {
  _id: string;
  plan: string;
  status: string;
  billingCycle: string | null;
  createdAt: string;
  userId: { _id: string; name: string; email: string } | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
