export let tokenTimeout = null;
export function setToken(token) {
  localStorage.setItem("token", token);
  ResetTokenExpiration();
}
export function ResetTokenExpiration() {
  ClearTokenExpiration();
  tokenTimeout = setTimeout(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, 60 * 60 * 1000);
}
export function ClearTokenExpiration() {
  if (tokenTimeout !== null) {
    clearTimeout(tokenTimeout);
  }
}
export function ActivityCheck() {
  const handleUserActivity = () => ResetTokenExpiration();

  window.addEventListener("mousemove", handleUserActivity);
  window.addEventListener("keypress", handleUserActivity);

  return () => {
    window.removeEventListener("mousemove", handleUserActivity);
    window.removeEventListener("keypress", handleUserActivity);
  };
}
