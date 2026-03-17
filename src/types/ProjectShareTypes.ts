export type ShareRole = "owner" | "editor" | "viewer";
export type ShareStatus = "pending" | "accepted" | "revoked";

export interface ApiShare {
  _id: string;
  projectId: string;
  inviteeEmail: string;
  inviteeUser: { _id: string; name?: string; email?: string } | null;
  role: "viewer" | "editor";
  status: ShareStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface ApiSharedProject {
  _id: string;
  repoUrl: string;
  repoOwner: string;
  repoName: string;
  status: string;
  meta?: { name?: string };
  createdAt: string;
  updatedAt: string;
  shareRole: "viewer" | "editor";
}

export interface SharePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
  isOwner: boolean;
}
