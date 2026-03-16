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
  content?: string; // only present when fetched individually
}

export interface VersionHistoryPanelProps {
  projectId: string;
  section: string; // e.g. "apiReference"
  sectionLabel: string; // e.g. "API Reference"
  onClose: () => void;
  onRestored: (
    effectiveOutput: Record<string, string>,
    editedSections: any[],
  ) => void;
}
