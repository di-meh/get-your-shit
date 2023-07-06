<script setup>
await nextTick()

const { data: categories, pending, refresh } = useGatewayFetch('/restaurant/categories')
</script>

<template>
  <div class="flex justify-start pt-4 pl-4">
    <NuxtLink to="/">
      <button class="btn rounded-full min-h-fit p-3 h-fit">
        <i class="bx bx-left-arrow-alt text-2xl" />
      </button>
    </NuxtLink>
  </div>
  <div class="container">
    <h3 class="text-2xl font-bold">
      Meilleures catégories
    </h3>
    <div class="cats">
      <NuxtLink v-for="cat in categories" :to="`/restaurant/categories/${cat.id}`" class="links">
        <div class="bg-neutral">
          <p>{{ cat.name }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
    padding: 1em;
    max-width: 100%;
}

.cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    grid-gap: 1em;
    margin-top: 1em;
    width: 70%;
    margin: auto;
    margin-top: 1em;
}

.cats > .links {
    width: 100%;
}

.cats div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 1em;
    width: -webkit-fill-available;
    margin: 0 1em;
    transition: all 0.2s ease-in-out;
}

.cats>div:hover {
    cursor: pointer;
    transform: scale(1.02);
}

.cats div i {
    font-size: 2rem;
}

.cats div p {
    font-size: 1rem;
}

/* desktop */

@media (min-width: 1280px) {

    .cats div {
        width: 100%;
        margin: 0;
    }

    .cats div p {
        font-size: 1.2rem;
    }

    .cats div i {
        font-size: 2.5rem;
    }
}

@media(max-width:634px) {
    .cats {
        width: 100%;
        grid-gap: 0;
    }
}
</style>
