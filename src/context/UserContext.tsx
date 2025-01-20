'use client';

import { createContext, useContext } from "react";

const UserContext = createContext<any>(null);

function useUserContext() {
    return useContext(UserContext);
}

export { UserContext, useUserContext };