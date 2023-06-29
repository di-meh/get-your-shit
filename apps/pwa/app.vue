<script setup>
import 'boxicons/css/boxicons.min.css'

</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
main.px-10.py-20.text-center {
  padding: 0;
  padding-bottom: 3em;
}

.Vue-Toastification__toast--success {
  background-color: #18342B;
}

html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
