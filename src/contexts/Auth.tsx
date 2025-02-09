'use client';

import { createContext } from "react";

const AuthContext = createContext<{
    signIn: (data: string) => void;
    signOut: () => void;
    authenticated: boolean;
    isLoading: boolean;
}>({
    signIn: (data: string) => null,
    signOut: () => null,
    authenticated: false,
    isLoading: false,
});

export { AuthContext };