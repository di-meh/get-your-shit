<script setup>
definePageMeta(
  {
    layout: 'admin',
    middleware: 'admin',
  },
)
onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      'data-theme': 'lemonade',
    },
  })
})
</script>

<template>
  <h1 class="heading-1">
    Users
  </h1>
</template>
