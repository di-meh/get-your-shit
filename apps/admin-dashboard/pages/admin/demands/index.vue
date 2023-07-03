<script setup>
definePageMeta(
  {
    layout: 'admin',
    middleware: 'admin',
  },
)
const { data: demands, pending, refresh } = useGatewayFetch('/demand/restaurant')

async function acceptDemand(id) {
  await useGatewayFetch(`/demand/restaurant/${id}/accept`, { method: 'PUT' })
  refresh()
}

async function refuseDemand(id) {
  await useGatewayFetch(`/demand/restaurant/${id}/reject`, { method: 'PUT' })
  refresh()
}

onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      'data-theme': 'lemonade',
    },
  })
})
</script>

<template>
  <div>
    <h1 class="font-bold text-4xl mb-6">
      Demandes
    </h1>
    <span v-if="pending" class="loading loading-spinner loading-lg" />
    <p v-else-if="!demands?.length">
      Pas de demandes actuellement.
    </p>
    <ul v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li v-for="demand in demands" :key="demand.id" class="card bg-bases-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ demand.name }}
          </h2>
          <p>{{ demand.address }}</p>
          <p>{{ demand.phone }}</p>
          <p>{{ demand.postal_code }}</p>
          <p>{{ demand.city }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="acceptDemand(demand.id)">
              Accepter
            </button>
            <button class="btn btn-secondary" @click="refuseDemand(demand.id)">
              Refuser
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
