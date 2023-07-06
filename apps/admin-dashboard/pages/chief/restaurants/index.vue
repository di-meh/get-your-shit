<script setup>
definePageMeta({
  layout: 'chief',
    middleware: 'chief'
});
const toast = useToast();

const { data: restaurants, refresh } = useGatewayFetch('/restaurant/getMyRestaurants');


function deleteProduct(id) {
  useGatewayFetch(`/restaurant/delete/${id}`, {
    method: 'DELETE',
    onResponse({ response }) {
      toast.add({
        title: 'Le restaurant ' + response._data.name + ' a bien été supprimé',
        description: 'Le restaurant a bien été supprimé',
      })
      refresh();
    }
  });
}
</script>

<template>
  <h1>Liste de mes restaurants</h1>
  <div v-if="restaurants">
    <div v-if="restaurants.length === 0">
      <p>Aucun restaurant</p>
    </div>
    <div v-else class="card w-full lg:grid lg:grid-cols-2 gap-4">
      <div v-for="restaurant in restaurants" class="bg-secondary text-secondary-content rounded-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ restaurant.name }}</h2>
          <p>{{ restaurant.address }}, {{ restaurant.city }}</p>
          <div class="card-actions justify-end">
            <NuxtLink :to="`/chief/restaurants/${restaurant.id}`"><button class="btn btn">Voir</button></NuxtLink>
            <NuxtLink :to="`/chief/restaurants/edit/${restaurant.id}`"><button class="btn btn-primary">Modifier</button></NuxtLink>
            <button class="btn bg-red-700 border-none" @click="deleteProduct(restaurant.id)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>