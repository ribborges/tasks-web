import { useEffect, useState } from "react";

import { useUserStore } from "@/lib/store";
import { fetchUser } from "@/actions/user.actions";

export default function useCheckUser() {
    const [userLoading, setUserLoading] = useState(true);
    const { user, setToken, setUser } = useUserStore();

    useEffect(() => {
        const loadUser = async () => {
            const result = await fetchUser();
            
            if ('token' in result && 'user' in result) {
                const { token, user } = result;

                setToken(token);
                setUser(user);
            } else {
                console.error("Error fetching user:", result.message);
            }
        };

        if (user === undefined) {
            loadUser();
        }

        setUserLoading(false);
    }, []);

    return { userLoading };
}