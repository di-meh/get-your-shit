<template>
  <NuxtLayout name="admin">
    <h1>Mdr</h1>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'admin'
})
onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      'data-theme': 'lemonade'
    }
  })
})
</script>
