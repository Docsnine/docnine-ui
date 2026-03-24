export type ActivitySeverity = "info" | "success" | "warning" | "error" | "critical";

export type ActivityCategory =
  | "auth"
  | "project"
  | "pipeline"
  | "doc"
  | "security"
  | "apispec"
  | "attachment"
  | "sharing"
  | "portal"
  | "export"
  | "integration"
  | "subscription"
  | "system";

export interface ActivityLog {
  _id: string;
  userId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  category: ActivityCategory;
  severity: ActivitySeverity;
  projectId?: string;
  projectName?: string;
  resourceId?: string;
  resourceType?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface ActivityLogsResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
