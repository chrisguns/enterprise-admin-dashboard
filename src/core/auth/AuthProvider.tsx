import * as React from "react";

export type AppRole = "customer" | "owner";

type AuthState = {
  role: AppRole;

  // Later this can become a real auth token/session
  isAuthenticated: boolean;

  // ✅ Convenience: routes can use this without repeating logic
  isOwnerAuthed: boolean;

  setRole: (role: AppRole) => void;
  signInAsOwner: () => void;

  // Optional helper (keeps intent clean in UI)
  signInAsCustomer: () => void;

  signOut: () => void;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<AppRole>(() => {
    const saved = localStorage.getItem("app.role");
    return (saved as AppRole) || "customer";
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return localStorage.getItem("app.owner.authed") === "true";
  });

  const setRole = (next: AppRole) => {
    setRoleState(next);
    localStorage.setItem("app.role", next);
  };

  const signInAsOwner = () => {
    setRole("owner");
    setIsAuthenticated(true);
    localStorage.setItem("app.owner.authed", "true");
  };

  const signInAsCustomer = () => {
    setRole("customer");
    setIsAuthenticated(false);
    localStorage.removeItem("app.owner.authed");
  };

  const signOut = () => {
    // Keeping this behavior the same as “customer”
    signInAsCustomer();
  };

  // ✅ owner is “authed” only when role is owner AND authenticated is true
  const isOwnerAuthed = role === "owner" && isAuthenticated;

  const value: AuthState = {
    role,
    isAuthenticated,
    isOwnerAuthed,
    setRole,
    signInAsOwner,
    signInAsCustomer,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
