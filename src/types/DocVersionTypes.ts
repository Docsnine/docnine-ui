export interface DocVersion {
  _id: string;
  projectId: string;
  section: string;
  source: "ai_full" | "ai_incremental" | "user";
  meta: {
    commitSha?: string;
    changedFiles?: string[];
    agentsRun?: string[];
    changeSummary?: string;
  };
  createdAt: string;
  updatedAt: string;
  /** Only present when fetched individually via versionsApi.get() */
  content?: string;
}

export interface VersionListResponse {
  versions: DocVersion[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VersionHistoryPanelProps {
  projectId: string;
  /** Backend section key e.g. "apiReference" */
  section: string;
  /** Human-readable label e.g. "API Reference" */
  sectionLabel: string;
  /** Whether the current effective content is a user edit (not pure AI output). */
  isUserEdited?: boolean;
  onClose: () => void;
  onRestored: (
    effectiveOutput: Record<string, string>,
    editedSections: any[],
  ) => void;
  /** Called when user confirms "Discard my edit → revert to AI version". */
  onRevertToAI?: () => void;
}
