export interface GitHubStatus {
  connected: boolean;
  githubUsername?: string;
  scopes?: string[];
  connectedAt?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  private: boolean;
  updated_at: string;
  language?: string;
}

export interface GitHubReposResponse {
  repos: GitHubRepo[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
}

export interface GitHubOrg {
  id: number;
  login: string;
  description: string | null;
  avatarUrl: string;
}

export interface OrgAccountPickerProps {
  username: string;
  orgs: GitHubOrg[];
  orgsLoading: boolean;
  selected: string | null;
  onSelect: (org: string | null) => void;
}
