const TOKEN_KEY = "nfs_access_token";
const REFRESH_KEY = "nfs_refresh_token";
const PILOT_KEY = "nfs_pilot_name";

export const AUTH_SESSION_CHANGE_EVENT = "nfs-auth-change";

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  pilotName: string;
  storage: Storage;
};

function getStorageWithToken(): Storage | null {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem(TOKEN_KEY)) return localStorage;
  if (sessionStorage.getItem(TOKEN_KEY)) return sessionStorage;
  return null;
}

export function getAuthSession(): AuthSession | null {
  const storage = getStorageWithToken();
  if (!storage) return null;

  const accessToken = storage.getItem(TOKEN_KEY);
  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken: storage.getItem(REFRESH_KEY) ?? undefined,
    pilotName: storage.getItem(PILOT_KEY) ?? "",
    storage,
  };
}

export function setAuthSession(
  data: { accessToken: string; refreshToken?: string; pilotName: string },
  persist: boolean
) {
  clearAuthSession();
  const storage = persist ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, data.accessToken);
  if (data.refreshToken) storage.setItem(REFRESH_KEY, data.refreshToken);
  storage.setItem(PILOT_KEY, data.pilotName);
  dispatchAuthChange();
}

export function updatePilotName(pilotName: string) {
  const session = getAuthSession();
  if (!session) return;
  session.storage.setItem(PILOT_KEY, pilotName);
  dispatchAuthChange();
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(REFRESH_KEY);
    storage.removeItem(PILOT_KEY);
  }
  dispatchAuthChange();
}

export function dispatchAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
}
