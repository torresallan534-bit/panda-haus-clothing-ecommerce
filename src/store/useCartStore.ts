import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  sku: string
  selectedSize: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  setIsOpen: (isOpen: boolean) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
          )
          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex].quantity += 1
            return { items: updated, isOpen: true }
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true }
        })
      },
      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.selectedSize === size)),
        }))
      },
      updateQuantity: (id, size, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.selectedSize === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: 'panda-haus-cart' }
  )
)
