<template>
    <div class="btm-nav bg-neutral">
        <NuxtLink to="/" :class="{ active: isActive('/delivery') }">
            <button class="flex flex-col items-center">
                <i class="bx bx-home"></i>
                <span>Accueil</span>
            </button>
        </NuxtLink>
        <NuxtLink :class="{ active: isActive('/search') }">
            <button class="flex flex-col items-center">
                <i class="bx bx-search"></i>
                <span>Historique</span>
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
.btm-nav>*:where(.active) {
    background-color: #222;
}
</style>
  