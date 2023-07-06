<script setup>
import { useToast } from "vue-toastification";
const route = useRoute()
const toast = useToast()


const { data: order } = useGatewayFetch(`/order/${route.params.id}`, {
    onResponse({ response }) {
        if (response._data.status === 'DELIVERING') {
            navigateTo('/delivery')
        }
    }
})

function restaurantAccept(e) {
    e.preventDefault()
    useGatewayFetch(`/order/delivery/restaurant/accept/${route.params.id}`, {
        method: 'PUT',
        body: {
            orderCode: e.target.orderCode.value
        },
        onResponse({ response }) {
            
            if (response.ok) {
                toast.success('Code accepté')
                navigateTo('/delivery/order/' + route.params.id + '-delivering')
            } else {
                toast.error('Code de livraison incorrect')
            }
            
        }
    })
}

</script>

<template>
    <h1>Delivering</h1>
    <form @submit="restaurantAccept($event)">
        <label for="orderCode">Code de livraison</label>
        <input id="orderCode" class="input" type="number" name="orderCode" placeholder="Code de livraison" />
        <button class="btn">Envoyer</button>
    </form>
</template>