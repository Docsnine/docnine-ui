// Map UI status filter values → API status query values
export const STATUS_API_MAP: Record<string, string> = {
  all: "",
  analyzing: "queued,running",
  completed: "done",
  failed: "error",
  archived: "archived",
};

// Map UI sort values → API sort params
export const SORT_API_MAP: Record<string, string> = {
  updated: "-updatedAt",
  created: "-createdAt",
  name: "repoName",
};
