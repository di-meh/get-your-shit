<script setup>
const { data: myOrders } = useGatewayFetch('/order/myOrders')
</script>

<template>
  <div v-if="!myOrders || myOrders.length === 0">
    <p>Aucune commande en cours</p>
  </div>
  <div v-else class="px-4">
    <h1 class="text-2xl font-bold mb-4 mt-4">
      Orders
    </h1>
    <div v-if="myOrders.length !== 0" class="flex flex-col gap-4 pb-2">
      <div v-for="order in myOrders" class="card w-full bg-neutral shadow-xl">
        <div v-if="order.status === 'CREATED'">
          <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
            <div class="w-full flex flex-col align-center cardBody">
              <div class="badge badge-primary mb-1">
                New
              </div>
              <h2 class="card-title">
                {{ order.restaurant.name }}
              </h2>
              <p class="text-left italic font-bold">
                {{ order.totalPrice }}€
              </p>
            </div>
            <!-- <div class="card-actions mt-2 w-full lg:justify-end">
                            <button class="btn w-full lg:w-auto" @click="openModal(product)">Voir</button>
                        </div> -->
          </div>
        </div>
        <div v-else-if="order.status === 'DELIVERED'">
          <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
            <div class="w-full flex flex-col align-center cardBody">
              <div className="badge badge-ghost mb-1">
                Delivered
              </div>
              <h2 class="card-title">
                {{ order.restaurant.name }}
              </h2>
              <p class="text-left italic font-bold">
                {{ order.totalPrice }}€
              </p>
            </div>
            <!-- <div class="card-actions mt-2 w-full lg:justify-end">
                            <button class="btn w-full lg:w-auto" @click="openModal(product)">Voir</button>
                        </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
