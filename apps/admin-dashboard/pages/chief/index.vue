<template>
  <NuxtLayout name="chief">
    <div class="card w-full bg-base-100 shadow-xl border-2 border-secondary">
      <div class="card-body">
        <h1 class="card-title">Bienvenue sur votre dashboard restaurateur!</h1>
        <p>Utilisez le menu ci-contre pour accéder aux autres sections de ce dashboard.</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'chief'
})

</script>
