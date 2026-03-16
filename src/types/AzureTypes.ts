export interface AzureStatus {
  connected: boolean;
  azureUsername?: string;
  scopes?: string[];
  connectedAt?: string;
}

export interface AzureRepo {
  id: string;
  name: string;
  webUrl: string;
  projectName: string;
  projectId?: string;
  isPrivate: boolean;
  lastUpdated?: string;
}

export interface AzureReposResponse {
  repos: AzureRepo[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
}
