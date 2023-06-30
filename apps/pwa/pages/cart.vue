<script setup>
import { storeToRefs } from 'pinia'
const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

function removeItemFromCart(product) {
    cartStore.removeFromCart(product);
    cart.value = cart.value.filter((item) => item.id !== product.id);
}

function emptyCart() {
    cartStore.clearCart();
    cart.value = []; // empty cartItems
}

</script>

<template>
    <h1>Panier</h1>
    <div v-if="!cart || cart.length === 0">
        <i class='bx bx-cart'></i>
        <h2>Ajouter des articles pour commencer un panier</h2>
        <p>
            Une fois que vous avez ajouté des
            articles d'un magasin, votre panier s'affiche ici
        </p>
        <NuxtLink to="/search">
            <button class="btn btn-neutral">Commander</button>
        </NuxtLink>
    </div>
    <div v-else>
        <div v-for="item in cart">
            <span>
                {{ item.name }} | {{ item.price }}€ | {{ item.description }} | {{ item.quantity }}
                <button @click="removeItemFromCart(item)">Remove</button>
            </span>
        </div>
        <button @click="emptyCart()">Vider le panier</button>
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