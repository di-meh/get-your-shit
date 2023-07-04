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
            <button class="btn btn-primary" @click="acceptDemand(demand.id, 'restaurant')">
              Accepter
            </button>
            <button class="btn btn-secondary" @click="refuseDemand(demand.id, 'restaurant')">
              Refuser
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="driveDemands" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li v-for="driver in driveDemands" :key="driver.id" class="card bg-bases-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ driver.name }}
          </h2>
          <p>{{ driver.departement }}</p>
          <p>{{ driver.vehicule_type }}</p>
          <p>{{ driver.date_birth }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="acceptDemand(driver.id, 'driver')">
              Accepter
            </button>
            <button class="btn btn-secondary" @click="refuseDemand(driver.id, 'driver')">
              Refuser
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta(
  {
    layout: 'admin',
    middleware: 'admin'
  }
)
const { data: demands, pending, refresh } = useGatewayFetch('/demand/restaurant')
const { data: driveDemands, refresh: refreshDriver } = useGatewayFetch('/demand/driver')


const acceptDemand = async (id, type) => {
  if (type === 'restaurant') {
    await useGatewayFetch(`/demand/restaurant/${id}/accept`, { method: 'PUT' })
    refresh()
  } else {
    await useGatewayFetch(`/demand/driver/${id}/accept`, { method: 'PUT' })
    refreshDriver()
  }
}

const refuseDemand = async (id, type) => {
  if (type === 'restaurant') {
    await useGatewayFetch(`/demand/restaurant/${id}/reject`, { method: 'PUT' })
    refresh()
  } else {
    await useGatewayFetch(`/demand/driver/${id}/reject`, { method: 'PUT' })
    refreshDriver()
  }
}

onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      'data-theme': 'lemonade'
    }
  })
})
</script>
