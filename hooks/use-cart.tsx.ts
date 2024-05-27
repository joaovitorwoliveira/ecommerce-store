import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item já adicionado ao carrinho");
        }

        set({ items: [...currentItems, data] });
        toast.success("Item adicionado ao carrinho");
      },
      removeItem: (id: string) => {
        const currentItems = get().items;

        set({ items: [...currentItems.filter((item) => item.id !== id)] });

        toast.success("Item removido do carrinho");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("Todos os itens removidos do carrinho");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
