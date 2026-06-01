/**
 * auth.ts — Auth Zustand store backed by real backend APIs.
 *
 * Access token lives in memory only (not localStorage).
 * The refresh token is a server-set httpOnly cookie — the browser
 * sends it automatically on POST /auth/refresh (credentials: 'include').
 *
 * initAuth() is called once at app startup (App.tsx) to restore session.
 */
import { create } from "zustand";
import { authApi, setAccessToken } from "@/lib/api";
import { AuthState } from "@/types/StateTypes";

// Deduplicate concurrent initAuth calls (e.g. React StrictMode double-mount).
// Without this, two simultaneous POST /auth/refresh requests with the same
// cookie both pass the hash check, each rotate to a different new token,
// and the second DB write makes the first cookie stale — breaking the session.
let _initAuthPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,

  /** Called after a successful login / signup. */
  setTokens: (user, token) => {
    setAccessToken(token);
    set({ user, isAuthenticated: true });
  },

  /** Called on logout or on failed refresh. */
  clearAuth: () => {
    setAccessToken(null);
    set({ user: null, isAuthenticated: false });
  },

  /**
   * On app startup:
   *  1. Try POST /auth/refresh which sends the httpOnly cookie.
   *  2. Mark initialized = true regardless of outcome so the app renders.
   *
   * Concurrent calls (React StrictMode, multiple components) share the same
   * in-flight request via _initAuthPromise so only one token rotation occurs.
   */
  initAuth: async () => {
    if (_initAuthPromise) return _initAuthPromise;

    _initAuthPromise = (async () => {
      try {
        const data = await authApi.refresh();
        setAccessToken(data.accessToken);
        set({ user: data.user, isAuthenticated: true });
      } catch {
        // Refresh token absent or expired — treat as logged-out.
        setAccessToken(null);
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ initialized: true });
        _initAuthPromise = null;
      }
    })();

    return _initAuthPromise;
  },
}));
