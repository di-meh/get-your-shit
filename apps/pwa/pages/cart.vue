<script setup>
import { storeToRefs } from 'pinia'
import { loadStripe } from '@stripe/stripe-js'
import {useJwt} from "@vueuse/integrations/useJwt";
import { useToast } from 'vue-toastification'

const toast = useToast()
const cartStore = useCartStore()
const { cart, total } = storeToRefs(cartStore)
const cookie = useCookie('token')
const { payload } = useJwt(cookie.value)
const runtimeConfig = useRuntimeConfig()
const modal = ref(null)
const selectedProduct = ref(null)
const selectedProductQuantity = ref(1)
const stripePromise = await loadStripe(runtimeConfig.public.stripePublicKey)
const origin = process.client ? window.location.origin : ''
const successUrl = `${origin}/payment/success`
const cancelUrl = `${origin}/payment/cancel`
const route = useRoute()
// Get current host from the browser using Nuxt

console.log(successUrl, route);

function removeItemFromCart(product) {
  cartStore.removeFromCart(product)
  cart.value = cart.value.filter(item => item.id !== product.id)
}

function emptyCart() {
  cartStore.clearCart()
  cart.value = [] // empty cartItems
}

function openModal(product) {
  selectedProduct.value = product
  selectedProductQuantity.value = product.quantity
  modal.value.showModal()
}

function resetProductQuantity() {
  selectedProductQuantity.value = 1
}

function updateCart(product) {
  cartStore.updateCart({
    ...product,
    quantity: selectedProductQuantity.value,
  })
  cart.value = cart.value.map((item) => {
    if (item.id === product.id) {
      return {
        ...item,
        quantity: selectedProductQuantity.value,
      }
    }
    return item
  })
  modal.value.close()
}

async function buy() {
  const lineItems = cart.value.map((item) => ({
    price: item.stripePriceId,
    quantity: item.quantity,
  }))
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl,
    cancelUrl,
    customerEmail: payload.value.email,
  })
  if (error) {
    toast.error(error.message)
  }
}
</script>

<template>
  <div class="flex justify-start pt-4 pl-4">
    <NuxtLink to="/">
      <button class="btn rounded-full min-h-fit p-3 h-fit">
        <i class="bx bx-left-arrow-alt text-2xl" />
      </button>
    </NuxtLink>
  </div>
  <h1 class="text-2xl font-bold mt-4 mb-4">
    Panier
  </h1>
  <div v-if="!cart || cart.length === 0" class="emptyCart mt-4">
    <i class="bx bx-cart" />
    <h2 class="text-xl">
      Ajouter des articles pour commencer un panier
    </h2>
    <p class="mt-4">
      Une fois que vous avez ajouté des
      articles d'un shop, votre panier s'affiche ici
    </p>
    <NuxtLink to="/search">
      <button class="btn btn-neutral mt-4">
        Commander
      </button>
    </NuxtLink>
  </div>
  <div v-else class="px-4">
    <div v-if="cart">
      <div v-if="cart" class="flex flex-col gap-4 pb-2">
        <div v-for="product in cart" class="card w-full bg-neutral shadow-xl">
          <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
            <div class="w-full flex flex-row justify-between align-center cardBody p-4">
              <h2 class="card-title">
                {{ product.name }}
              </h2>
              <p class="text-left italic font-bold">
                {{ product.price }}€
              </p>
              <p class="text-left">
                Qty: {{ product.quantity }}
              </p>
            </div>
            <div class="card-actions mt-2 w-full lg:justify-end">
              <button class="btn w-full lg:w-auto" @click="openModal(product)">
                Modifier
              </button>
              <button class="btn bg-red-700 border-none w-full lg:w-auto" @click="removeItemFromCart(product)">
                Retirer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>Total : {{ total }}€</h3>
    <button class="mt-2 btn w-full" @click="emptyCart()">
      Vider le panier
    </button>
    <button class="mt-2 btn bg-neutral border-none w-full" @click="buy">
      Payer
    </button>
    <dialog ref="modal" class="modal">
      <form v-if="selectedProduct" method="dialog" class="modal-box">
        <div class="modal-header">
          <h3>Vous avez séléctioné : {{ selectedProduct.name }}</h3>
        </div>
        <div class="modal-body">
          <p>Quel quantité souhaitez-vous acheter ?</p>
          <select v-model="selectedProductQuantity" class="select w-full max-w-xs mt-2">
            <option v-for="n in 30" :key="n" :value="n" :selected="n === selectedProductQuantity">
              {{ n }}
            </option>
          </select>
        </div>
        <div class="modal-action">
          <button class="btn bg-neutral border-0" @click="updateCart(selectedProduct)">
            Modifier le
            produit
          </button>
          <button class="btn" @click="resetProductQuantity">
            Close
          </button>
        </div>
      </form>
    </dialog>

    <!-- <button class="btn" onclick="my_modal_3.showModal()">open modal</button>
        <dialog id="my_modal_3" class="modal">
            <form method="dialog" class="modal-box">

                <div class="modal-action">
                    if there is a button in form, it will close the modal
                    <button class="btn">Close</button>
                </div>
            </form>
        </dialog> -->
  </div>
</template>

<style scoped>
.emptyCart {
    padding: 1em;
}

.emptyCart > p {
    font-size: 0.8em;
}

.emptyCart > i {
    font-size: 3em;
    margin-bottom: 10px;
}
</style>
