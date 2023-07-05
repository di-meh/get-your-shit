<script setup>
await nextTick();
definePageMeta({
  layout: 'delivery'
})

const ordersRef = ref([])
const restaurantsRef = ref([])

const { data: orders, pending, refresh } = useGatewayFetch('/order', {
  onResponse({ response }) {
    ordersRef.value = response._data
  }
})
const { data: restaurants } = useGatewayFetch('/restaurant', {
  onResponse({ response }) {
    restaurantsRef.value = response._data
  }
})


// get the restaurant name for each order

const ordersWithRestaurantName = computed(() => {
  return ordersRef.value.map(order => {
    const restaurant = restaurantsRef.value.find(restaurant => restaurant.id === order.restaurantId)
    return {
      ...order,
      restaurantName: restaurant.name
    }
  })
})







</script>

<template>
  <h1>Delivery</h1>
  <!-- show restaurant name with the order -->
  <ul>
    <li v-for="order in ordersWithRestaurantName" :key="order.id">
      <NuxtLink :to="`/delivery/order/${order.id}`">
        {{ order.restaurantName }} - {{ order.status }}
      </NuxtLink>
    </li>
  </ul>
</template>