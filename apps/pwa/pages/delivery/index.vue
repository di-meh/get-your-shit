<script setup>
await nextTick()
definePageMeta({
  layout: 'delivery',
})

const ordersRef = ref([])
const restaurantsRef = ref([])

const { data: orders, pending, refresh } = useGatewayFetch('/order/created', {
  onResponse({ response }) {
    ordersRef.value = response._data
  },
})
const { data: restaurants } = useGatewayFetch('/restaurant', {
  onResponse({ response }) {
    restaurantsRef.value = response._data
  },
})

// get the restaurant name for each order

const ordersWithRestaurantName = computed(() => {
  return ordersRef.value.map((order) => {
    const restaurant = restaurantsRef.value.find(restaurant => restaurant.id === order.restaurantId)
    return {
      ...order,
      restaurantName: restaurant.name,
      restaurantAddress: restaurant.address,
    }
  })
})
</script>

<template>
  <h1>Delivery</h1>
  <div v-if="ordersWithRestaurantName" class="px-4">
    <div v-if="ordersWithRestaurantName.length" class="flex flex-col gap-4 pb-2">
      <div v-for="order in ordersWithRestaurantName" class="card w-full bg-neutral shadow-xl">
        <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
          <div class="w-full flex flex-col align-center cardBody">
            <h2 class="card-title">
              {{ order.restaurantName }}
            </h2>
            <p class="lg:text-left description">
              {{ order.restaurantAddress }}
            </p>
            <p class="text-left italic font-bold">
              {{ order.totalPrice }}€
            </p>
          </div>
          <div class="card-actions mt-2 w-full lg:justify-end">
            <NuxtLink :to="`/delivery/order/${order.id}`">
              <button class="btn w-full lg:w-auto">
                Voir
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
