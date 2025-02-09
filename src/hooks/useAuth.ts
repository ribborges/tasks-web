import { useContext } from "react";

import { AuthContext } from "@/contexts/Auth";

export function useAuth() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useAuth must be wrapped in a <AuthProvider />');
        }
    }

    return value;
}