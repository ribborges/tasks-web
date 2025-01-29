import { create } from 'zustand';

type State = {
    isLoading: boolean;
}

type Actions = {
    setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<State & Actions>((set) => ({
    isLoading: true,
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useLoadingStore;