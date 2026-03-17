export interface BitbucketStatus {
  connected: boolean;
  bitbucketUsername?: string;
  scopes?: string[];
  connectedAt?: string;
}

export interface BitbucketRepo {
  uuid: string;
  name: string;
  full_slug: string;
  links: { html: { href: string } };
  description?: string;
  is_private: boolean;
  updated_on: string;
}

export interface BitbucketReposResponse {
  repos: BitbucketRepo[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
}
