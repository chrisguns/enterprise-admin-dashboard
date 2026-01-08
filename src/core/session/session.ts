export type AppRole = "public" | "client" | "owner";

const KEY = "appRole:v1";

export function getRole(): AppRole {
  const raw = localStorage.getItem(KEY);
  if (raw === "client" || raw === "owner" || raw === "public") return raw;
  return "public";
}

export function setRole(role: AppRole) {
  localStorage.setItem(KEY, role);
}

export function clearRole() {
  localStorage.removeItem(KEY);
}
