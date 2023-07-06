<script setup>

</script>

<template>
    <h1>Panier</h1>
    <div>
        <i class='bx bx-cart' ></i>
        <h2>Ajouter des articles pour commencer un panier</h2>
        <p>
            Une fois que vous avez ajouté des 
            articles d'un magasin, votre panier s'affiche ici
        </p>
        <NuxtLink to="/search" >
            <button class="btn btn-neutral">Commander</button>
        </NuxtLink>
    </div>
</template>

<style scoped>

h1 {
    padding: 1em;
    margin-bottom: 20px;
    font-size: 2rem;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

div i {
    font-size: 4rem;
    margin-bottom: 20px;
}

div h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

div p {
    font-size: 1rem;
    margin-bottom: 20px;
}



</style>