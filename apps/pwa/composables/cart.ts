import { acceptHMRUpdate, defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

export const useCartStore = defineStore('cart', () => {
    const { data: cart, isFinished } = useIDBKeyval('cart', [])

    function addToCart(product: any) {
        cart.value.push(product)
    }

    function removeFromCart(id: string) {
        cart.value = cart.value.filter((product: any) => product.id !== id)
    }

    function clearCart() {
        cart.value = []
    }

    async function getCart() {
        return cart.value
    }

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        isFinished
    }


})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))