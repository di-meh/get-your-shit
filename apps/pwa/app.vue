<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import 'boxicons/css/boxicons.min.css'
import { onBeforeMount, computed } from 'vue'
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
console.log(authStore.isAuthenticated);
if (!authStore.isAuthenticated) {
  await navigateTo('/login')
}

</script>

<style>
/* temporaire */

* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
</style>
