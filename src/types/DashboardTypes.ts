import { Project, ProjectStatus } from "./ProjectTypes";

export interface ProjectFilters {
  status: ProjectStatus | "all";
  sort: "updated" | "created" | "name";
  search: string;
}

export interface DashboardStats {
  projectLimit: number | null;
  projectCount: number;
  canCreateProject: boolean;
}

export interface GithubNotice {
  type: "success" | "error";
  message: string;
}

export interface DashboardFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | "all";
  onStatusChange: (value: ProjectStatus | "all") => void;
  sortBy: "updated" | "created" | "name";
  onSortChange: (value: "updated" | "created" | "name") => void;
}

export interface SharedProjectsProps {
  projects: Project[];
  isLoading: boolean;
}

export interface ProjectsGridProps {
  projects: Project[];
  isLoading: boolean;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onArchive: (id: string, e: React.MouseEvent) => void;
  onRetry: (id: string, e: React.MouseEvent) => void;
  actionLoading: string | null;
  debouncedSearch: string;
  statusFilter: ProjectStatus | "all";
}
