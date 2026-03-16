export interface GitLabStatus {
  connected: boolean;
  gitlabUsername?: string;
  scopes?: string[];
  connectedAt?: string;
}

export interface GitLabRepo {
  id: number;
  name: string;
  path_with_namespace: string;
  web_url: string;
  description?: string;
  visibility: "public" | "private" | "internal";
  last_activity_at: string;
}

export interface GitLabReposResponse {
  repos: GitLabRepo[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
}
