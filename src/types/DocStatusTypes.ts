import { ApiShare } from "./ProjectShareTypes";

export interface StatusConfig {
  label: string;
  icon: React.ElementType;
  /** Tailwind classes for the badge background + text */
  badgeClass: string;
  /** Tailwind class for the tiny dot */
  dotClass: string;
  /** Tailwind class for the icon color */
  iconClass: string;
}

export type DocStatus =
  | "draft"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "outdated"
  | "archived";

export interface DocStatusLogEntry {
  status: DocStatus;
  changedAt: string; // ISO
  changedBy?: string; // display name or email
  note?: string;
}

export interface DocSectionTrack {
  status: DocStatus;
  assignee?: string; // display name or email string
  dueDate?: string; // ISO date (date-only part, e.g. "2025-07-01")
  log: DocStatusLogEntry[];
}

// projectId → sectionKey → track
export type Entries = Record<string, Record<string, DocSectionTrack>>;

export interface StatusChangeModalProps {
    isOpen: boolean
    onClose: () => void
    pendingStatus: DocStatus | null
    onConfirm: (note: string, taggedMember?: string) => void
    members: ApiShare[]
    loadingMembers: boolean
}