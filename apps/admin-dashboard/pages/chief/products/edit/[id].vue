<script setup>
definePageMeta({
  layout: 'chief',
  middleware: 'chief',
})

const toast = useToast()
const cookie = useCookie('token')
const route = useRoute()
const productsRef = ref(null)
const restaurantRef = ref(null)
const categoriesRef = ref(null)

const { data: categories } = useGatewayFetch('/restaurant/categories', {
  onResponse({ response }) {
    categoriesRef.value = response._data
  },
})

const { data: products } = useGatewayFetch(`/restaurant/products/${route.params.id}`, {
  onResponse({ response }) {
    productsRef.value = response._data
  },
})

const { data: restaurants } = useGatewayFetch('/restaurant/getMyRestaurants', {
  onResponse({ response }) {
    restaurantRef.value = response._data
  },
})

function updateProduct(event) {
  useGatewayFetch(`/restaurant/products/${route.params.id}`, {
    method: 'PUT',
    body: {
      name: event.name,
      price: Number.parseInt(event.price),
      description: event.description,
      categoryId: event.categoryId,
      restaurantId: event.restaurantId,
    },
    onResponse({ response }) {
      toast.add({
        title: 'Produit modifié',
        description: 'Le produit a bien été modifié',
      })
      navigateTo('/chief/products')
    },
  })
}
</script>

<template>
  <FormKit
    v-if="productsRef" type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6"
    :actions="false" @submit="updateProduct($event)"
  >
    <FormKit
      type="text" name="name" label="Nom du produit" placeholder="Nom du produit" validation="required|name"
      input-class="input input-bordered input-accent mt-2 w-full rounded-xl" outer-class="w-full"
      label-class="label label-text" message-class="label-text-alt mt-2 text-error" :value="productsRef.name"
    />
    <FormKit
      type="number" name="price" label="Prix du produit" placeholder="Prix du produit" validation="required|price"
      input-class="input input-bordered input-accent mt-2 w-full rounded-xl" outer-class="w-full"
      label-class="label label-text" message-class="label-text-alt mt-2 text-error" :value="productsRef.price"
    />
    <FormKit
      type="textarea" name="description" label="Description du produit" placeholder="Description du produit"
      validation="required|description" input-class="input input-bordered input-accent mt-2 w-full h-24 rounded-xl"
      outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
      :value="productsRef.description"
    />
    <FormKit
      v-if="categoriesRef" v-model="productsRef.categoryId" type="select" label="Catégorie du produit" name="categoryId"
      outer-class="w-full" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
      label-class="label label-text" message-class="label-text-alt mt-2 text-error" validation="required|categoryId"
    >
      <option v-for="cat in categoriesRef" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </FormKit>
    <FormKit
      v-if="restaurantRef" v-model="productsRef.restaurantId" type="select" label="Restaurant du produit" name="restaurantId"
      outer-class="w-full" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
      label-class="label label-text" message-class="label-text-alt mt-2 text-error"
      validation="required|restaurantId"
    >
      <option v-for="rest in restaurantRef" :key="rest.id" :value="rest.id">
        {{ rest.name }}
      </option>
    </FormKit>

    <UButton size="md" type="submit" color="emerald" block>
      Modifier
    </UButton>
  </FormKit>
</template>
