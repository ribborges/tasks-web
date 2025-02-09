'use client';

import { type PropsWithChildren } from "react";

import { AuthContext } from "@/contexts/Auth";
import { useUserStatus } from "@/hooks/useUserStatus";

export function AuthProvider({ children }: PropsWithChildren) {
    const { isLoading, authenticated } = useUserStatus();

    return (
        <AuthContext.Provider
            value={{
                signIn: async (token) => {
                    if (!token) {
                        return;
                    }

                    //setSession(token);
                },
                signOut: () => {
                    //setSession(null);
                },
                authenticated,
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    );
}