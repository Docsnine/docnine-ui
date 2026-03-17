/**
 * Service: Project Creation
 * Unified project creation logic across different import methods
 */

import { projectsApi } from "@/lib/api";
import { ApiException } from "@/types/ApiTypes";
import type {
  ManualProjectFormValues,
  FromScratchFormValues,
  NormalizedRepo,
  ApiProject,
} from "@/types/ProjectTypes";

export interface ProjectCreationResult {
  project: ApiProject;
  projectId: string;
}

/**
 * Map API error codes to user-friendly messages
 */
const ERROR_MESSAGES: Record<string, string> = {
  DUPLICATE_PROJECT: "A pipeline is already running for this repository.",
  PROJECT_LIMIT_REACHED:
    "You've reached the maximum number of projects for your current plan. Consider upgrading your subscription.",
  GITLAB_NOT_CONNECTED:
    "GitLab account is not connected. Please connect GitLab in Settings first.",
  GITHUB_NOT_CONNECTED:
    "GitHub account is not connected. Please connect GitHub in Settings first.",
  BITBUCKET_NOT_CONNECTED:
    "Bitbucket account is not connected. Please connect Bitbucket in Settings first.",
  AZURE_NOT_CONNECTED:
    "Azure DevOps account is not connected. Please connect Azure DevOps in Settings first.",
  INVALID_REPO_URL: "The repository URL is invalid or not supported.",
  INVALID_PROJECT_NAME: "Project name is required.",
  PROJECT_RUNNING:
    "This project is already processing. Please wait for it to complete.",
  PROJECT_ARCHIVED: "This project is archived. Cannot perform this action.",
  TOKEN_EXPIRED:
    "Your authentication token has expired. Please reconnect your provider.",
  NETWORK_ERROR:
    "Network error occurred. Please check your connection and try again.",
  PLAN_GATE: "This feature requires a higher subscription plan.",
};

export class ProjectCreationService {
  /**
   * Format API error into user-friendly message
   */
  static formatErrorMessage(err: unknown): string {
    if (err instanceof ApiException) {
      // Use mapped message if available, otherwise use API message
      return (
        ERROR_MESSAGES[err.code] || err.message || "Failed to create project."
      );
    }

    if (err instanceof Error) {
      return err.message;
    }

    return "An unexpected error occurred.";
  }

  /**
   * Create project from manual repository URL
   */
  static async fromManualUrl(
    values: ManualProjectFormValues,
  ): Promise<ProjectCreationResult> {
    try {
      const result = await projectsApi.create(values.repoUrl);
      const project = result.project || (result as any);
      return {
        project,
        projectId: project._id,
      };
    } catch (err) {
      throw new Error(ProjectCreationService.formatErrorMessage(err));
    }
  }

  /**
   * Create project from provider (GitHub, GitLab, etc.)
   */
  static async fromProvider(
    repo: NormalizedRepo,
  ): Promise<ProjectCreationResult> {
    try {
      const repoUrl = repo.html_url || repo.web_url || "";

      if (!repoUrl) {
        throw new Error(
          "Unable to determine repository URL. Please try again or contact support.",
        );
      }

      const result = await projectsApi.create(repoUrl);
      const project = result.project || (result as any);

      return {
        project,
        projectId: project._id,
      };
    } catch (err) {
      throw new Error(ProjectCreationService.formatErrorMessage(err));
    }
  }

  /**
   * Create project from ZIP file upload
   */
  static async fromZip(zipFile: File): Promise<ProjectCreationResult> {
    try {
      const result = await projectsApi.uploadZip(zipFile);
      return {
        project: result.project,
        projectId: result.project._id,
      };
    } catch (err) {
      throw new Error(ProjectCreationService.formatErrorMessage(err));
    }
  }

  /**
   * Create empty project from scratch
   */
  static async fromScratch(
    values: FromScratchFormValues,
  ): Promise<ProjectCreationResult> {
    try {
      const result = await projectsApi.createFromScratch(values.projectName);
      return {
        project: result.project,
        projectId: result.project._id,
      };
    } catch (err) {
      throw new Error(ProjectCreationService.formatErrorMessage(err));
    }
  }

  /**
   * Validate ZIP file before upload
   */
  static async validateZip(
    zipFile: File,
  ): Promise<{ valid: boolean; message?: string }> {
    try {
      return await projectsApi.validateZip(zipFile);
    } catch (err) {
      return {
        valid: false,
        message: "Failed to validate ZIP file",
      };
    }
  }
}
