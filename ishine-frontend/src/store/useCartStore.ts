import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    sku: string;
}

interface CartState {
    items: CartItem[];
    isModalOpen: boolean;
    modalItem: CartItem | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    openModal: (item: CartItem) => void;
    closeModal: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isModalOpen: false,
            modalItem: null,
            addToCart: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...currentItems, item] });
                }

                // Automatically open modal when item is added
                get().openModal(item);
            },
            removeFromCart: (id) =>
                set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
                })),
            clearCart: () => set({ items: [] }),
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            openModal: (item) => set({ isModalOpen: true, modalItem: item }),
            closeModal: () => set({ isModalOpen: false, modalItem: null }),
        }),
        {
            name: 'ishine-cart-storage',
            // Don't persist modal state
            partialize: (state) => ({ items: state.items }),
        }
    )
);
