import create from "zustand";

interface StoreState {
  screenLoading: boolean;
  showScreenLoading: (isLoading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  screenLoading: false,
  showScreenLoading: (isLoading) => set({ screenLoading: isLoading })
}));
