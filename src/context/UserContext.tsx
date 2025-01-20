import { createContext, useContext } from "react";

const UserContext = createContext('');

function useUserContext() {
    return useContext(UserContext);
}

export { UserContext, useUserContext };