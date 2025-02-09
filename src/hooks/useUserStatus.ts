'use client';

import { useEffect, useState } from "react";

import { useUserStore } from "@/lib/store";
import { getLoginStatus } from "@/services/auth.service";

export function useUserStatus() {
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const { user } = useUserStore();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const isLoggued = await getLoginStatus();

                if (!isLoggued) return;

                setAuthenticated(isLoggued.data);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }

        if (user === undefined) {
            checkUser();
        }
    }, []);

    return { isLoading, authenticated };
}