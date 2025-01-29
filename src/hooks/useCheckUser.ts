'use client';

import { useEffect } from "react";

import { useLoadingStore, useUserStore } from "@/lib/store";

export default function useCheckUser() {
    const { setIsLoading } = useLoadingStore();
    const { user, status } = useUserStore();

    useEffect(() => {
        const checkUser = async () => {
            try {
                await status();

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }

        if (user === undefined) {
            checkUser();
        }
    }, []);
}