import create from "zustand";

interface StoreState {
  screenLoading: boolean;
  showScreenLoading: (isLoading: boolean) => void;
  openSidebar: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<StoreState>((set) => ({
  screenLoading: false,
  showScreenLoading: (isLoading) => set({ screenLoading: isLoading }),
  openSidebar: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar }))
}));
