<script setup lang="ts">
</script>

<template>
  <div>
    <header class="relative">
      <PublicNavBar />
    </header>
    <main class="mt-16">
      <slot />
    </main>
    <PublicFooter />
  </div>
</template>
