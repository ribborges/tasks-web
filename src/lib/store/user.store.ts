import { create } from 'zustand';

import { UserSchema } from '@/types/user';

type State = {
    user?: UserSchema;
    token?: string;
}

type Actions = {
    setUser: (user: UserSchema) => void;
    setToken: (token: string) => void;
}

const useUserStore = create<State & Actions>((set) => ({
    user: undefined,
    token: undefined,
    setUser: (user: UserSchema) => {
        set({ user });
    },
    setToken: (token: string) => {
        set({ token });
    }
}));

export default useUserStore;