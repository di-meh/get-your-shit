<script setup>
definePageMeta({
  layout: 'chief'
});
const toast = useToast();

const { data: products, refresh } = useGatewayFetch('/restaurant/products');

function deleteProduct(id) {
  useGatewayFetch(`/restaurant/products/${id}`, {
    method: 'DELETE',
    onResponse({ response }) {
      if (response.ok) {
        toast.add({
          title: 'Le produit ' + response._data.name + ' a bien été supprimé',
          description: 'Le produit a bien été supprimé',
        })
        refresh();
      }
    }
  });
}
</script>

<template>
  <h1>Products</h1>
  <NuxtLink to="/chief/products/create"><button class="btn bg-secondary border-none text-secondary-content mb-2">Ajouter
      un produit</button></NuxtLink>
  <div v-if="products">
    <div v-if="products.length === 0">
      <p>Aucun produit de créé</p>
    </div>
    <div v-else class="card w-full lg:grid lg:grid-cols-2 gap-4">
      <div v-for="product in products" class="bg-secondary text-secondary-content rounded-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ product.name }}</h2>
          <p class="card-subtitle">{{ product.description }}</p>
          <p class="card-subtitle">{{ product.price }}€</p>
          <p>{{ product.category.name }}</p>
          <div class="card-actions justify-end">
            <NuxtLink :to="`/chief/products/edit/${product.id}`"><button class="btn btn-primary">Modifier</button>
            </NuxtLink>
            <button class="btn bg-red-700 border-none" @click="deleteProduct(product.id)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>