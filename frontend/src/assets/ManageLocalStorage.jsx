export let tokenTimeout = null;
const Seconds = 1000;
const Minutes = 60 * Seconds;
const Hour = 60 * Minutes;
export function setToken(token) {
  localStorage.setItem("token", token);
  ResetTokenExpiration();
}
export function ResetTokenExpiration() {
  ClearTokenExpiration();
  tokenTimeout = setTimeout(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      document.dispatchEvent(new CustomEvent("logout"));
      window.location.reload();
    }
  }, 5000);
}
export function ClearTokenExpiration() {
  if (tokenTimeout !== null) {
    clearTimeout(tokenTimeout);
    tokenTimeout = null;
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
