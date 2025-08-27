"use client";

import { useState } from 'react';
import { UserContext } from './context';

interface User {
  sessionId: string | null;
  accountId: number | null;
  favorites: number[];
}

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    sessionId: null,
    accountId: null,
    favorites: [],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}