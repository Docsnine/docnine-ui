import { create } from "zustand";
import { notificationsApi } from "@/lib/api";
import { Notification } from "@/types/NotificationTypes";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  total: number;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  // Actions
  fetchNotifications: (reset?: boolean) => Promise<void>;
  fetchMore: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  archive: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  total: 0,
  page: 1,
  hasMore: false,
  isLoading: false,
  isLoadingMore: false,
  error: null,

  fetchNotifications: async (reset = true) => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const data = await notificationsApi.list({ page: 1, limit: 20 });
      set({
        notifications: data.notifications,
        unreadCount: data.unreadCount,
        total: data.total,
        page: 1,
        hasMore: data.hasMore,
      });
    } catch (err: any) {
      set({ error: err.message ?? "Failed to load notifications" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMore: async () => {
    const { hasMore, isLoadingMore, page, notifications } = get();
    if (!hasMore || isLoadingMore) return;
    set({ isLoadingMore: true });
    try {
      const nextPage = page + 1;
      const data = await notificationsApi.list({ page: nextPage, limit: 20 });
      set({
        notifications: [...notifications, ...data.notifications],
        total: data.total,
        page: nextPage,
        hasMore: data.hasMore,
        unreadCount: data.unreadCount,
      });
    } catch {
      // Silently fail — existing notifications remain visible
    } finally {
      set({ isLoadingMore: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const data = await notificationsApi.unreadCount();
      set({ unreadCount: data.count });
    } catch {
      // Non-critical — badge just won't update
    }
  },

  markAsRead: async (id: string) => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(
        0,
        state.unreadCount -
          (state.notifications.find((n) => n._id === id && !n.isRead) ? 1 : 0)
      ),
    }));
    try {
      await notificationsApi.markAsRead(id);
    } catch {
      // Revert on failure
      get().fetchNotifications();
    }
  },

  markAllAsRead: async () => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
    try {
      await notificationsApi.markAllAsRead();
    } catch {
      get().fetchNotifications();
    }
  },

  archive: async (id: string) => {
    // Optimistic removal from feed
    set((state) => {
      const target = state.notifications.find((n) => n._id === id);
      return {
        notifications: state.notifications.filter((n) => n._id !== id),
        total: Math.max(0, state.total - 1),
        unreadCount: Math.max(
          0,
          state.unreadCount - (target && !target.isRead ? 1 : 0)
        ),
      };
    });
    try {
      await notificationsApi.archive(id);
    } catch {
      get().fetchNotifications();
    }
  },

  deleteNotification: async (id: string) => {
    const target = get().notifications.find((n) => n._id === id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
      total: Math.max(0, state.total - 1),
      unreadCount: Math.max(
        0,
        state.unreadCount - (target && !target.isRead ? 1 : 0)
      ),
    }));
    try {
      await notificationsApi.delete(id);
    } catch {
      get().fetchNotifications();
    }
  },

  reset: () =>
    set({
      notifications: [],
      unreadCount: 0,
      total: 0,
      page: 1,
      hasMore: false,
      isLoading: false,
      isLoadingMore: false,
      error: null,
    }),
}));
