import { acceptHMRUpdate, defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'
import { useToast } from "vue-toastification";

const toast = useToast()

export const useCartStore = defineStore('cart', () => {
    const { data: cart, isFinished } = useIDBKeyval('cart', [])

    function addToCart(product: any) {
        if (cart.value.find((item: any) => item.id === product.id)) {
            toast.error('Product : ' + product.name + ' already exists in cart')
            return
        }
        cart.value.push(product)
        toast.success('Product : ' + product.name + ' added to cart' + ' with ' + product.quantity + ' quantity')
    }

    function updateCart(product: any) {
        cart.value = cart.value.map((item: any) => {
            if (item.id === product.id) {
                return product
            }
            return item
        })
        toast.success('Product : ' + product.name + ' updated in cart' + ' to ' + product.quantity + ' quantity')
    }

    function removeFromCart(product: any) {
        cart.value = cart.value.filter((item: any) => item.id !== product.id)
        toast.success('Product : ' + product.name + ' removed from cart')
    }


    function clearOnLogout() {
        cart.value = []
    }


    function clearCart() {
        cart.value = []
        toast.success('Cart cleared')
    }

    function getCart() {
        return cart.value
    }

    const total = computed(() => {
        return cart.value.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
    })

    const cartCount = computed(() => {
        return cart.value.length
    })

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        isFinished,
        updateCart,
        total,
        cartCount,
        clearOnLogout
    }


})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))