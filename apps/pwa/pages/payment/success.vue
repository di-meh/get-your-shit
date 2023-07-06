<template>
  <div class="loading-logout mt-8 flex flex-col items-center justify-center h-screen gap-8">
      <span class="loading loading-spinner loading-lg  bg-neutral" />
      <h1 class="text-2xl">Payment finalisé...</h1>
</div>
</template>

<script setup>
import {useToast} from 'vue-toastification'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()

definePageMeta({
layout: 'empty',
})


const toast = useToast()

toast.success('Payment successful')
setTimeout(async () => {
  cartStore.clearOnLogout()
  await navigateTo('/')
}, 1000)

</script>