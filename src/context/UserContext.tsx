"use client";
import { User } from "@/types";
import React, { createContext, useEffect, useState } from "react";

type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  function getUserFromLocalStorage() {
    const local = localStorage.getItem("user");
    if (local) return JSON.parse(local);
    else return {} as User;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

