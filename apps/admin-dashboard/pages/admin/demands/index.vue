<template>
    <h1 class="font-bold text-4xl mb-6">Demandes</h1>
    <span v-if="pending" class="loading loading-spinner loading-lg"></span>
    <p v-else-if="!demands.length">Pas de demandes actuellement.</p>
    <ul v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li v-for="demand in demands" class="card bg-bases-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ demand.name }}</h2>
          <p>{{ demand.address }}</p>
          <p>{{ demand.phone }}</p>
          <p>{{ demand.postal_code }}</p>
          <p>{{ demand.city }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Accepter</button>
            <button class="btn btn-secondary">Refuser</button>
          </div>
        </div>
      </li>
    </ul>
</template>

<script setup>
definePageMeta(
    {
      layout: 'admin',
      middleware: 'admin'
    }
)
const {data: demands, pending} = useGatewayFetch('/demand')
onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      'data-theme': 'lemonade'
    }
  })
})
</script>