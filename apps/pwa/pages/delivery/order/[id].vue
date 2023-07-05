<script setup>
const route = useRoute()

const orderItemsRef = ref([])
const restaurantsRef = ref([])






const { data: orderItems } = useGatewayFetch(`/order/item/${route.params.id}`, {
    onResponse({ response }) {
        orderItemsRef.value = response._data
    }
})
const { data: restaurants } = useGatewayFetch('/restaurant', {
    onResponse({ response }) {
        restaurantsRef.value = response._data
    }
})


// get the restaurant name, address, product name, and price for each order item

const orderItemsWithRestaurantName = computed(() => {
    return orderItemsRef.value.map(orderItem => {
        const restaurant = restaurantsRef.value.find(restaurant => restaurant.id === orderItem.restaurantId)
        
        
    })
})







</script>

<template>
    <h1>Delivery</h1>
    <div v-if="orderItemsWithRestaurantName.length === 0">
        <p>Loading...</p>
    </div>
    <div v-else>
        <h2>Order Items</h2>
        <!-- <ul>
            <li v-for="orderItem in orderItemsWithRestaurantName" :key="orderItem.id">
                <p>Restaurant Name: {{ orderItem.restaurantName }}</p>
                <p>Restaurant Address: {{ orderItem.restaurantAddress }}</p>
                <p>Product Name: {{ orderItem.productName }}</p>
                <p>Price: {{ orderItem.price }}</p>
            </li>
        </ul> -->
    </div>
</template>