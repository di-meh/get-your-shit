<script setup>
import { storeToRefs } from 'pinia'
const cartStore = useCartStore()
const { cart, total } = storeToRefs(cartStore)
const modal = ref(null);
const selectedProduct = ref(null);
const selectedProductQuantity = ref(1);

function removeItemFromCart(product) {
    cartStore.removeFromCart(product);
    cart.value = cart.value.filter((item) => item.id !== product.id);
}

function emptyCart() {
    cartStore.clearCart();
    cart.value = []; // empty cartItems
}

function openModal(product) {
    selectedProduct.value = product;
    selectedProductQuantity.value = product.quantity;
    modal.value.showModal()
}

function resetProductQuantity() {
    selectedProductQuantity.value = 1;
}

function updateCart(product) {
    cartStore.updateCart({
        ...product,
        quantity: selectedProductQuantity.value
    });
    cart.value = cart.value.map((item) => {
        if (item.id === product.id) {
            return {
                ...item,
                quantity: selectedProductQuantity.value
            };
        }
        return item;
    });
    modal.value.close();
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
        <div v-for="item in cart" class="flex flex-raw">
            <span @click="openModal(item)">
                {{ item.name }} | {{ item.price }}€ | {{ item.description }} | {{ item.quantity }}    
            </span>
            <button @click="removeItemFromCart(item)">Remove</button>
        </div>

        <button class="mt-8" @click="emptyCart()">Vider le panier</button>
        <dialog class="modal" ref="modal">
            <form method="dialog" class="modal-box" v-if="selectedProduct">
                <div class="modal-header">
                    <h3>Vous avez séléctioné : {{ selectedProduct.name }}</h3>
                </div>
                <div class="modal-body">
                    <p>Quel quantité souhaitez-vous acheter ?</p>
                    <select class="select w-full max-w-xs" v-model="selectedProductQuantity">
                        <option v-for="n in 30" :key="n" :value="n" :selected="n === selectedProductQuantity">{{ n }}
                        </option>
                    </select>
                </div>
                <div class="modal-action">
                    <button class="btn bg-neutral border-0" @click="updateCart(selectedProduct)">Modifier le
                        produit</button>
                    <button class="btn" @click="resetProductQuantity">Close</button>
                </div>
            </form>
        </dialog>
        <h3>Total : {{total}}€</h3>

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