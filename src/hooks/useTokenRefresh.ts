/**
 * useTokenRefresh : Automatically refreshes access token periodically
 *
 * With the extended 2-day access token TTL, this hook provides an extra
 * layer of protection by silently refreshing the token every 24 hours
 * while the user is active. This ensures sessions never expire unexpectedly.
 *
 * Features:
 * - Refreshes token every 24 hours (86400ms)
 * - Only runs when user is authenticated
 * - Can be manually triggered via returned function
 * - Silent : user won't notice anything
 * - Respects pause/resume (checks auth state)
 */

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth";
import { authApi, setAccessToken } from "@/lib/api";

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

export function useTokenRefresh() {
  const { isAuthenticated } = useAuthStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshNow = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await authApi.refresh();
      if (data?.accessToken) {
        // Persist the new token and update the store so the user's profile
        // stays current (server may return an updated user object too).
        setAccessToken(data.accessToken);
        if (data.user) {
          useAuthStore.getState().setTokens(data.user, data.accessToken);
        }
        console.debug("[useTokenRefresh] Token refreshed successfully");
      }
    } catch {
      // Refresh token is expired or invalid. The next API call will detect the
      // 401, fail the silent refresh, and trigger the SessionExpiredDialog.
      console.debug("[useTokenRefresh] Token refresh failed : session will expire on next request");
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
