<script setup>
definePageMeta({
  layout: 'chief',
})

const route = useRoute()

const { data: orders, refresh } = useGatewayFetch(`/order/restaurant/${route.params.id}`)

function deleteOrder(id) {
  useGatewayFetch(`/order/delete/${id}`, {
    method: 'DELETE',
    onResponse({ response }) {
      toast.add({
        title: 'La commande a bien été supprimée',
        description: 'La commande a bien été supprimée',
      })
    },
  })
}
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">
    Commandes en cours
  </h1>
  <div v-if="!orders || orders.length === 0">
    <p>Aucune commande en cours</p>
  </div>
  <div v-else>
    <div v-if="orders.length !== 0" class="card w-full lg:grid lg:grid-cols-2 gap-4">
      <div v-for="order in orders" :key="order.id" class="bg-secondary text-secondary-content rounded-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title">
            {{ order.user.username }}
          </h2>
          <p>Prix de la commande : {{ order.totalPrice }}€</p>
          <p>Status : {{ order.status }}</p>
          <p>Code de livraison : {{ order.orderCode }}</p>
          <div class="card-actions justify-end flex-nowrap">
            <button class="btn bg-red-700 border-none" @click="deleteOrder(order.id)">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
