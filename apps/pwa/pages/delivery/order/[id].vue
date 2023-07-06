<script setup>
const route = useRoute()
const orderItemsRef = ref([])
const orderRef = ref([])
import { useToast } from "vue-toastification";
const toast = useToast()

const { data: orderItems } = useGatewayFetch(`/order/item/${route.params.id}`, {
    onResponse({ response }) {
        orderItemsRef.value = response._data
    }
})

const { data: order } = useGatewayFetch(`/order/${route.params.id}`, {
    onResponse({ response }) {
        orderRef.value = response._data
    }
})

function acceptDelivery() {
    useGatewayFetch(`/order/delivery/accept/${route.params.id}`, {
        method: 'PUT',
        body: {
            orderCode: orderRef.value.orderCode
        },
        onResponse({ response }) {
            if (response.ok) {
                toast.success('Commande acceptée')
                navigateTo('/delivery/order/' + route.params.id + '-pickingup')
            } else {
                toast.error('Code de livraison incorrect')
            }
        }
    })
}

</script>

<template>
    <h1>Delivery</h1>
    <div v-if="orderItemsRef" class="px-4">
        <div v-if="orderItemsRef.length" class="flex flex-col gap-4 pb-2">
            <div v-for="orderItem in orderItemsRef" class="card w-full bg-neutral shadow-xl">
                <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
                    <div class="w-full flex flex-col align-center cardBody">
                        <h2 class="card-title">{{ orderItem.product.name }}</h2>
                        <p class="lg:text-left description">{{ orderItem.product.description }}</p>
                        <p class="text-left italic font-bold">{{ orderItem.product.price }}€</p>
                    </div>
                </div>
            </div>
            <button class="btn w-full lg:w-auto" @click="acceptDelivery()">Accepter</button>
        </div>
    </div>
</template>