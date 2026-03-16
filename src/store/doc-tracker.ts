/**
 * doc-tracker.ts — Per-project documentation status tracker.
 *
 * Persisted to localStorage via zustand/middleware.
 * Tracks a status, optional assignee, optional due date, and an audit log
 * for each (projectId, sectionKey) pair.
 *
 * TODO: Replace localStorage persistence with real API calls when a backend
 * endpoint becomes available.
 */
import { DEFAULT_SECTION } from "@/configs/DocStatusConfig";
import {
  DocSectionTrack,
  DocStatus,
  DocStatusLogEntry,
  Entries,
} from "@/types/DocStatusTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Store interface ──────────────────────────────────────────────────────────
interface DocTrackerState {
  entries: Entries;

  /** Change the status of a section and append an audit log entry. */
  setStatus: (
    projectId: string,
    section: string,
    status: DocStatus,
    changedBy?: string,
    note?: string,
  ) => void;

  /** Update the assignee for a section. */
  setAssignee: (
    projectId: string,
    section: string,
    assignee: string | undefined,
  ) => void;

  /** Update the due date for a section (ISO date string or undefined to clear). */
  setDueDate: (
    projectId: string,
    section: string,
    dueDate: string | undefined,
  ) => void;

  /** Get the tracker entry for one section, or undefined if never set. */
  getEntry: (projectId: string, section: string) => DocSectionTrack | undefined;

  /** Get all section entries for a project as a map. */
  getProjectSummary: (projectId: string) => Record<string, DocSectionTrack>;

  /** True if the due date has passed and status is not approved/published/archived. */
  isOverdue: (projectId: string, section: string) => boolean;
}

// ── Store implementation ─────────────────────────────────────────────────────
export const useDocTrackerStore = create<DocTrackerState>()(
  persist(
    (set, get) => ({
      entries: {},

      setStatus: (projectId, section, status, changedBy, note) => {
        const now = new Date().toISOString();
        set((state) => {
          const projectEntries = state.entries[projectId] ?? {};
          const existing: DocSectionTrack = projectEntries[section] ?? {
            ...DEFAULT_SECTION,
          };
          const logEntry: DocStatusLogEntry = {
            status,
            changedAt: now,
            changedBy,
            note,
          };
          return {
            entries: {
              ...state.entries,
              [projectId]: {
                ...projectEntries,
                [section]: {
                  ...existing,
                  status,
                  log: [logEntry, ...existing.log].slice(0, 30), // keep last 30
                },
              },
            },
          };
        });
      },

      setAssignee: (projectId, section, assignee) => {
        set((state) => {
          const projectEntries = state.entries[projectId] ?? {};
          const existing: DocSectionTrack = projectEntries[section] ?? {
            ...DEFAULT_SECTION,
          };
          return {
            entries: {
              ...state.entries,
              [projectId]: {
                ...projectEntries,
                [section]: { ...existing, assignee },
              },
            },
          };
        });
      },

      setDueDate: (projectId, section, dueDate) => {
        set((state) => {
          const projectEntries = state.entries[projectId] ?? {};
          const existing: DocSectionTrack = projectEntries[section] ?? {
            ...DEFAULT_SECTION,
          };
          return {
            entries: {
              ...state.entries,
              [projectId]: {
                ...projectEntries,
                [section]: { ...existing, dueDate },
              },
            },
          };
        });
      },

      getEntry: (projectId, section) => {
        return get().entries[projectId]?.[section];
      },

      getProjectSummary: (projectId) => {
        return get().entries[projectId] ?? {};
      },

      isOverdue: (projectId, section) => {
        const entry = get().entries[projectId]?.[section];
        if (!entry?.dueDate) return false;
        const nonOverdueStatuses: DocStatus[] = [
          "approved",
          "published",
          "archived",
        ];
        if (nonOverdueStatuses.includes(entry.status)) return false;
        return new Date(entry.dueDate) < new Date();
      },
    }),
    {
      name: "docnine-doc-tracker",
    },
  ),
);
