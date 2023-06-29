<script setup>
import { ref, onBeforeMount } from 'vue';

const { id } = useRoute().params;
const categories = ref(null);

onBeforeMount(async () => {
    const url = '/restaurant/categories/' + id;
    const { data } = await useGatewayFetch(url);
    categories.value = data;
});
</script>

<template>
    <div v-if="categories">
        {{ categories.value.name }}
        <h2>Produits :</h2>
        <div v-for="cat in categories.value.products">
            {{ cat.name }}
            {{ cat.price }}
            {{ cat.description }}
        </div>
    </div>
    <div v-else>Loading...</div>
</template>
