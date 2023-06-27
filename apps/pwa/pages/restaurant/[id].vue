<script setup>
const route = useRoute()
const { data: restaurant, pending, refresh } = useGatewayFetch('/restaurant/' + route.params.id)

</script>

<template>
    <div>
        <h1>{{ restaurant.name }} {{ restaurant.city }}</h1>
    </div>
</template>

