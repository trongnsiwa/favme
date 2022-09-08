import create from "zustand";

interface StoreState {
  screenLoading: boolean;
  showScreenLoading: (isLoading: boolean) => void;
  openSidebar: boolean;
  toggleSidebar: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  screenLoading: false,
  showScreenLoading: (isLoading) => set({ screenLoading: isLoading }),
  openSidebar: true,
  toggleSidebar: (open) => set({ openSidebar: open })
}));
