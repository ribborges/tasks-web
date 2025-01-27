import { create } from 'zustand';

import { UserSchema } from '@/types/user';
import { LoginData, RegisterData } from '@/interfaces/auth';
import { getLoginStatus, loginUser, logoutUser, registerUser } from '@/services/auth.service';
import { getLoggedUser } from '@/services/user.service';

type State = {
    user?: UserSchema;
    token?: string;
}

type Actions = {
    setUser: (user: UserSchema, token: string) => void;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    status: () => Promise<void>;
    logout: () => void;
}

const useUserStore = create<State & Actions>((set) => ({
    user: undefined,
    token: undefined,
    setUser: (user: UserSchema, token: string) => {
        set({ user, token });
    },
    login: async (data: LoginData) => {
        try {
            const res = await loginUser(data);

            if (!res) {
                //setMessage({ message: 'An error occurred', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            if (!res?.status.toString().startsWith('2')) {
                //setMessage({ message: res.status + ": " + res.data, type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            const { token, ...user } = res.data;

            set({ user, token });
        } catch (error) {
            //setMessage({ message: 'An error occurred', type: 'error' });
            //setLoading(false);
            set({ user: undefined, token: undefined });
        }
    },
    register: async (data: RegisterData) => {
        try {
            const res = await registerUser(data);

            if (!res) {
                //setMessage({ message: 'An error occurred', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            if (!res?.status.toString().startsWith('2')) {
                //setMessage({ message: res.status + ": " + res.data, type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            const { token, ...user } = res.data;

            set({ user, token });
        } catch (error) {
            //setMessage({ message: 'An error occurred', type: 'error' });
            //setLoading(false);
            set({ user: undefined, token: undefined });
        }
    },
    status: async () => {
        try {
            const isLoggued = await getLoginStatus();

            if (!isLoggued) {
                //setMessage({ message: 'An error occurred', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            if (isLoggued.data === false) {
                //setMessage({ message: 'No user loggued in', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            const res = await getLoggedUser();

            if (!res) {
                //setMessage({ message: 'An error occurred', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            if (!res?.status.toString().startsWith('2')) {
                //setMessage({ message: res.status + ": " + res.data, type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            const { token, ...user } = res.data;

            set({ user, token });
        } catch (error) {
            //setMessage({ message: 'An error occurred', type: 'error' });
            //setLoading(false);
            set({ user: undefined, token: undefined });
        }
    },
    logout: () => {
        try {
            const res = logoutUser();

            if (!res) {
                //setMessage({ message: 'An error occurred', type: 'error' });
                //setLoading(false);
                set({ user: undefined, token: undefined });
                return;
            }

            set({ user: undefined, token: undefined });
        } catch (error) {
            //setMessage({ message: 'An error occurred', type: 'error' });
            //setLoading(false);
            set({ user: undefined, token: undefined });
        }
    }
}));

export default useUserStore;