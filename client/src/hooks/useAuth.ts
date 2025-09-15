//A mock auth provider for now (later hook into backend JWT).

import { useState } from "react";

type User = { username: string } | null;

export function useAuth() {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (username: string, _password: string) => {
    const loggedInUser = { username };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, login, logout };
}
