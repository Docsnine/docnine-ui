/**
 * useTokenRefresh — Automatically refreshes access token periodically
 *
 * With the extended 2-day access token TTL, this hook provides an extra
 * layer of protection by silently refreshing the token every 24 hours
 * while the user is active. This ensures sessions never expire unexpectedly.
 *
 * Features:
 * - Refreshes token every 24 hours (86400ms)
 * - Only runs when user is authenticated
 * - Can be manually triggered via returned function
 * - Silent — user won't notice anything
 * - Respects pause/resume (checks auth state)
 */

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth";
import { authApi } from "@/lib/api";

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

export function useTokenRefresh() {
  const { isAuthenticated } = useAuthStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshNow = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await authApi.refresh();
      if (data?.accessToken) {
        // Token refreshed silently
        console.debug("[useTokenRefresh] Token refreshed successfully");
      }
    } catch (err) {
      // Refresh failed — apiFetch will handle logout on next API call
      console.debug(
        "[useTokenRefresh] Token refresh failed (will retry on next API call)",
      );
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear interval if user logs out
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Set up periodic refresh
    intervalRef.current = setInterval(() => {
      refreshNow();
    }, REFRESH_INTERVAL);

    // Clean up on unmount or when auth changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated]);

  return { refreshNow };
}
