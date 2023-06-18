<template>
    <h1 id="title">Paniers</h1>
    <div class="content">
        <i class='bx bx-cart-alt'></i>
        <p>Ajoutez des articles pour commencer un panier</p>
        <p>
            Une fois que vous avez ajouté des plat d'un restaurant ou les articles d'un magasin,
            votre panier apparaîtra ici.
        </p>
        <NuxtLink to="/search" class="button">
            <button>Commander</button>
        </NuxtLink>
    </div>
</template>


<style>

h1#title {
    padding-left: 1rem;
    margin-top: 2rem;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
}

.content > i {
    font-size: 5rem;
    margin-bottom: 1rem;
}

.content > p {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 1rem;
}

.content > .button > button {
    border: none;
    outline: none;
    border-radius: 2222222px;
    padding: 1rem 2rem;
    background-color: black;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
}

.content > .button > button:hover {
    background-color: #7f7f7f;
}




</style>