<script setup>
import { ref, onBeforeMount } from 'vue';

const { id } = useRoute().params;
const restaurant = ref(null);
const cart = useCartStore();

onBeforeMount(async () => {
    const url = '/restaurant/' + id;
    const { data } = await useGatewayFetch(url);
    restaurant.value = data;

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
    <div v-if="restaurant">
        {{ restaurant.value.name }}
        <div v-for="product in restaurant.value.products" @click="addProductToCart(product)">
            {{ product.name }}
            {{ product.price }}
            {{ product.description }}
        </div>
    </div>
    <div v-else>Loading...</div>
</template>
