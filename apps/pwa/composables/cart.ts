import { acceptHMRUpdate, defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'
import { useToast } from "vue-toastification";

const toast = useToast()

export const useCartStore = defineStore('cart', () => {
    const { data: cart, isFinished } = useIDBKeyval('cart', [])

    function addToCart(product: any) {
        cart.value.push(product)
        console.log()
        toast.success('Product : ' + product.name + ' added to cart')
    }

    function removeFromCart(product: any) {
        cart.value = cart.value.filter((item: any) => item.id !== product.id)
        toast.success('Product : ' + product.name + ' removed from cart')
    }

    function clearCart() {
        cart.value = []
        toast.success('Cart cleared')
    }

    function getCart() {
        console.log('Getting cart:', cart.value)
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