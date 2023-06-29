<script setup>
import { ref, onBeforeMount } from 'vue';

const { id } = useRoute().params;
const categories = ref(null);
const cart = useCartStore();

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
        quantity: 1,
    };
    cart.addToCart(productToAdd);
}

</script>

<template>
    <div v-if="categories">
        {{ categories.value.name }}
        <h2>Produits :</h2>
        <div v-for="product in categories.value.products" @click="addProductToCart(product)">
            {{ product.name }}
            {{ product.price }}
            {{ product.description }}
        </div>
    </div>
    <div v-else>Loading...</div>
</template>
