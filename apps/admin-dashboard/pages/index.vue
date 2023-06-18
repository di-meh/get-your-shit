<template>
  <div>
    <PublicHero />
    <div class="py-24 sm:py-32 bg-neutral-focus text-neutral-content">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-bold tracking-tight sm:text-6xl">
            Faites-vous connaître
          </h2>
          <p class="mt-6 text-lg leading-8">
            Pourquoi se limiter à un quartier quand vous pouvez toucher plus large ? En inscrivant votre point de vente sur notre plateforme, vous toucherez jusqu'à 5x plus de potentiels clients.
          </p>
        </div>
      </div>
    </div>
    <div class="py-24 sm:py-32 bg-secondary-focus text-secondary-content">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-end">
        <div class="mx-auto max-w-2xl lg:mx-0 flex flex-col items-end justify-stretch text-right w-full">
          <h2 class="text-4xl font-bold tracking-tight sm:text-6xl w-full">
            Gardez le contrôle sur votre business
          </h2>
          <p class="mt-6 text-lg leading-8 w-full">
            Grâce à notre dashboard et nos outils dédiés, vous pouvez ajouter de nouveaux produits, surveiller les tendances de commandes de vos clients et bien d'autres choses. Le tout en quelques clics.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-accent text-accent-content px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-4xl font-bold tracking-tight sm:text-6xl">
          Vous n'avez pas encore sauté le pas ?
        </h2>
        <p class="mt-6 text-lg leading-8">
          Faites une demande d'enregistrement de votre restaurant dès maintenant.
        </p>
        <NuxtLink to="/register">
          <button class="mt-6 btn btn-neutral">
            Devenir restaurateur
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
