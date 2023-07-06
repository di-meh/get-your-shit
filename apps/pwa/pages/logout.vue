<script setup>
import { useToast } from "vue-toastification";
const userStore = useUserStore()
const toast = useToast();


setTimeout(() => {
    userStore.logout()
    toast.success("Vous êtes déconnecté");
    navigateTo('/')
}, 1000)

</script>

<template>
    <div class="loading-logout">
        <span class="loading loading-spinner loading-lg  bg-neutral"></span>
    <h1 >Déconnexion</h1>
    </div>
</template>

<style>

.loading-logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.loading-logout h1 {
    margin-top: 20px;
    font-size: 2rem;
}



</style>