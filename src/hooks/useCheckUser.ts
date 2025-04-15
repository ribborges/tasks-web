import { useEffect, useState } from "react";

import { useUserStore } from "@/lib/store";
import { fetchUser } from "@/actions/user.actions";

export default function useCheckUser() {
    const [userLoading, setUserLoading] = useState(true);
    const { user, setToken, setUser } = useUserStore();

    useEffect(() => {
        const loadUser = async () => {
            const result = await fetchUser();
            if (result) {
                const { token, user } = result;
                
                setToken(token);
                setUser(user);
            }
        };

        if (user === undefined) {
            loadUser();
        }

        setUserLoading(false);
    }, []);

    return { userLoading };
}