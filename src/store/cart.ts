import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },
      
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(i => i.variantId === item.variantId)
          if (existingItem) {
            const maxQty = item.stock || existingItem.stock || 999
            return {
              items: state.items.map(i =>
                i.variantId === item.variantId
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, maxQty), stock: item.stock || i.stock }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },
      
      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter(i => i.variantId !== variantId),
        }))
      },
      
      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(variantId)
          return
        }
        set((state) => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'peptide-cart',
      onRehydrateStorage: (state) => {
        return () => {
          useCartStore.setState({ _hasHydrated: true })
        }
      },
    }
  )
)
