export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type NotificationEntityType =
  | "PROJECT"
  | "DOCUMENTATION"
  | "SECURITY"
  | "PAYMENT"
  | "SUBSCRIPTION"
  | "SHARE"
  | "PORTAL"
  | "PIPELINE"
  | "SYSTEM"
  | "SLACK"
  | "EXPORT";

export type NotificationType =
  | "PIPELINE_COMPLETED"
  | "PIPELINE_FAILED"
  | "PIPELINE_TIMEOUT"
  | "DOC_SECTION_UPDATED"
  | "DOC_VERSION_RESTORED"
  | "DOC_STATUS_CHANGED"
  | "DOC_CHANGES_REQUESTED"
  | "DOC_APPROVED"
  | "SECURITY_CRITICAL_FINDING"
  | "SECURITY_HIGH_FINDING"
  | "SECURITY_REPORT_READY"
  | "SHARE_INVITE_RECEIVED"
  | "SHARE_INVITE_ACCEPTED"
  | "SHARE_MEMBER_REMOVED"
  | "SHARE_ROLE_CHANGED"
  | "PORTAL_PUBLISHED"
  | "PORTAL_VIEWED_MILESTONE"
  | "SUBSCRIPTION_PAYMENT_SUCCESS"
  | "SUBSCRIPTION_PAYMENT_FAILED"
  | "SUBSCRIPTION_PLAN_EXPIRING"
  | "SUBSCRIPTION_PLAN_EXPIRED"
  | "SUBSCRIPTION_UPGRADED"
  | "SUBSCRIPTION_DOWNGRADED"
  | "PLAN_LIMIT_APPROACHING"
  | "PLAN_LIMIT_REACHED"
  | "SLACK_CONNECTED"
  | "SLACK_DISCONNECTED"
  | "EXPORT_COMPLETED"
  | "SYSTEM_ANNOUNCEMENT"
  | "SYSTEM_MAINTENANCE"
  | "WELCOME";

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  entityType: NotificationEntityType;
  title: string;
  message: string;
  projectId?: string | null;
  entityId?: string | null;
  actionUrl?: string | null;
  isRead: boolean;
  isArchived: boolean;
  metadata: Record<string, string>;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UnreadCountResponse {
  count: number;
}
