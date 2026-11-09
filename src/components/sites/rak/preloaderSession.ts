const preloaderKey = "rak-pre";

export function hasSeenPreloader() {
  try {
    return window.sessionStorage.getItem(preloaderKey) !== null;
  } catch {
    return true;
  }
}

export function markPreloaderSeen() {
  try {
    window.sessionStorage.setItem(preloaderKey, "1");
  } catch {
    // The intro can finish even when the browser blocks session storage.
  }
}
