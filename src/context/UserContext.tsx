import { User } from "@/types";
import React, { createContext, useState } from "react";

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<ContextType>({} as ContextType);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

