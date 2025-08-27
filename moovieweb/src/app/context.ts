"use client";

import { createContext } from 'react';


interface User {
  sessionId: string | null;
  accountId: number | null;
  favorites: number[];
}


export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: { sessionId: null, accountId: null, favorites: [] },
  setUser: () => {},
});