import { User } from "@/types";
import React, { createContext, useState } from "react";

type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User|null>>;
};

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null >(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

