<template>
    <div class="loading-logout mt-8 flex flex-col items-center justify-center h-screen gap-8">
        <span class="loading loading-spinner loading-lg  bg-neutral" />
        <h1 class="text-2xl">Payment annulé...</h1>
  </div>
</template>

<script setup>
import {useToast} from 'vue-toastification'

definePageMeta({
  layout: 'empty',
})


const toast = useToast()

toast.error('Payment cancelled')
setTimeout(async () => {
    await navigateTo('/')
}, 1000)

</script>