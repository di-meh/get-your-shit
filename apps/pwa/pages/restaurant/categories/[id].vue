<script setup>
import { ref, onBeforeMount } from 'vue';

const { id } = useRoute().params;
const categories = ref(null);
const cart = useCartStore();
const modal = ref(null);
const selectedProduct = ref(null);
const selectedProductQuantity = ref(1);

onBeforeMount(async () => {
    const url = '/restaurant/categories/' + id;
    const { data } = await useGatewayFetch(url);
    categories.value = data;
});

function addProductToCart(product) {
    const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: selectedProductQuantity.value,
    };
    cart.addToCart(productToAdd);
    selectedProductQuantity.value = 1;
}

function openModal(product) {
    selectedProduct.value = product;
    modal.value.showModal()
}

function resetProductQuantity() {
    selectedProductQuantity.value = 1;
}

</script>

<template>
    <div v-if="categories">
        {{ categories.value.name }}
        <h2>Produits :</h2>
        <div v-for="product in categories.value.products" @click="openModal(product)">
            {{ product.name }}
            {{ product.price }}
            {{ product.description }}
        </div>
    </div>
    <div v-else>Loading...</div>
    <dialog class="modal" ref="modal">
        <form method="dialog" class="modal-box" v-if="selectedProduct">
            <div class="modal-header">
                <h3>Vous avez séléctioné : {{ selectedProduct.name }}</h3>
            </div>
            <div class="modal-body">
                <p>Quel quanité souhaitez vous acheter ?</p>
                <select class="select w-full max-w-xs" v-model="selectedProductQuantity">
                    <option v-for="n in 30" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>
            <div class="modal-action">
                <button class="btn bg-neutral border-0" @click="addProductToCart(selectedProduct)">Ajouter au
                    panier</button>
                <button class="btn" @click="resetProductQuantity">Close</button>
            </div>
        </form>
    </dialog>
</template>
