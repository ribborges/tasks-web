'use client';

import { ReactNode } from "react";

import { UserContext } from "@/context/UserContext";

interface UserProviderProps {
    children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    return (
        <UserContext.Provider value="User">
            {children}
        </UserContext.Provider>
    );
}
