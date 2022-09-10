import create from "zustand";
import { Category, Favorite } from "@prisma/client";

interface FilterType {
  searchBy: string;
  status: string;
  orderBy: string;
}
interface StoreState {
  screenLoading: boolean;
  showScreenLoading: (isLoading: boolean) => void;
  openSidebar: boolean;
  toggleSidebar: (open: boolean) => void;
  ownCategories: Category[];
  setOwnCategories: (categories: Category[]) => void;
  showFavorite: boolean;
  toggleFavorite: () => void;
  favorite: (Favorite & { category: Category }) | null;
  setFavorite: (favorite: Favorite & { category: Category }) => void;
  refetchFavorites: any;
  setRefetchFavorites: (refetch: any) => void;
  manageCategory: boolean;
  toggleManageCategory: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  screenLoading: false,
  showScreenLoading: (isLoading) => set({ screenLoading: isLoading }),
  openSidebar: true,
  toggleSidebar: (open) => set({ openSidebar: open }),
  ownCategories: [],
  setOwnCategories: (categories) => set({ ownCategories: categories }),
  showFavorite: false,
  toggleFavorite: () => set((state) => ({ showFavorite: !state.showFavorite })),
  favorite: null,
  setFavorite: (favorite) => set({ favorite: favorite }),
  refetchFavorites: null,
  setRefetchFavorites: (refetch) => set({ refetchFavorites: refetch }),
  manageCategory: false,
  toggleManageCategory: (open) => set((state) => ({ manageCategory: open }))
}));
