<script setup>

const cart = useCartStore();
// const cartItems = ref(null);

const caca = async (e) => {
    const cartItems = await cart.getCart();
    console.log(cartItems);

}







// setTimeout(async () => {
//     const e = await cart.getCart();
//     cartItems.value = e;
//     console.log(cartItems.value);
// }, 1000);


function removeItemFromCart(id) {
    cart.removeFromCart(id);
    cartItems.value = cartItems.value.filter(item => item.id !== id); // remove item from cartItems
}

function emptyCart() {
    cart.clearCart();
}

</script>

<template>
    <h1>Panier</h1>
    <div v-if="!cartItems">
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
    <!-- <div v-if="cartItems">
        <div v-for="item in cartItems">
            <span>{{ item.name }} | {{ item.price }}€ | {{ item.description }} | {{ item.quantity }} <button @click="removeItemFromCart(item.id)">Remove</button></span>
        </div>
    </div> -->
    <button @click="emptyCart()">Vider le panier</button>
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