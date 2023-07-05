<template>
  <div class="btm-nav bg-neutral">
    <NuxtLink to="/" :class="{ active: isActive('/') }">
      <button class="flex flex-col items-center">
        <i class="bx bx-home"></i>
        <span>Accueil</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/search" :class="{ active: isActive('/search') }">
      <button class="flex flex-col items-center">
        <i class="bx bx-search"></i>
        <span>Parcourir</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/cart" :class="{ active: isActive('/cart') }">
      <button class="flex flex-col items-center">
        <i class="bx bx-cart"></i>
        <span v-if="cartStore.cartCount > 0">Panier {{ cartStore.cartCount }}</span>
        <span v-else>Panier</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/profile" :class="{ active: isActive('/profile') }">
      <button class="flex flex-col items-center">
        <i class="bx bx-user"></i>
        <span>Compte</span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const cartStore = useCartStore()
function isActive(routePath) {
  return route.path === routePath
}

</script>

<style scoped>
.btm-nav > *:where(.active) {
  background-color: #222;
}
</style>
