import { CreateCategoryInput } from "./../schemas/category.schema";
import create from "zustand";
import { Category } from "@prisma/client";

interface StoreState {
  screenLoading: boolean;
  showScreenLoading: (isLoading: boolean) => void;
  openSidebar: boolean;
  toggleSidebar: (open: boolean) => void;
  ownCategories: Category[];
  setOwnCategories: (categories: Category[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  screenLoading: false,
  showScreenLoading: (isLoading) => set({ screenLoading: isLoading }),
  openSidebar: true,
  toggleSidebar: (open) => set({ openSidebar: open }),
  ownCategories: [],
  setOwnCategories: (categories) => set({ ownCategories: categories })
}));
