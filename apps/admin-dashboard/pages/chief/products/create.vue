<script setup>
definePageMeta({
    layout: 'chief'
});

const toast = useToast();
const cookie = useCookie('token');
const productsRef = ref(null);
const restaurantRef = ref(null);

const { data: products } = useGatewayFetch('/restaurant/categories', {
    onResponse({ response }) {
      productsRef.value = response._data;
    }
});

const { data: restaurants } = useGatewayFetch('/restaurant/getMyRestaurants', {
    onResponse({ response }) {
      restaurantRef.value = response._data;
    }
});


function test(event) {
  const { data: products } = useGatewayFetch('/restaurant/products', {
    method: 'POST',
    body: {
      name: event.name,
      price: parseInt(event.price),
      description: event.description,
      categoryId: event.categoryId,
      restaurantId: event.restaurantId
    },
    onResponse({ response }) {
      console.log(response);
      toast.add({
        title: 'Produit ajouté',
        description: 'Le produit a bien été ajouté',
      })
      navigateTo('/chief/products');
    }
  });
}


</script>

<template>
    <FormKit type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6" :actions="false" @submit="test($event)">
        <FormKit
          type="text"
          name="name"
          label="Nom du produit"
          placeholder="Nom du produit"
          validation="required|name"
          input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
          outer-class="w-full"
          label-class="label label-text"
          message-class="label-text-alt mt-2 text-error"
        />
        <FormKit
          type="number"
          name="price"
          label="Prix du produit"
          placeholder="Prix du produit"
          validation="required|price"
          input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
          outer-class="w-full"
          label-class="label label-text"
          message-class="label-text-alt mt-2 text-error"
        />
        <FormKit
          type="textarea"
          name="description"
          label="Description du produit"
          placeholder="Description du produit"
          validation="required|description"
          input-class="input input-bordered input-accent mt-2 w-full h-24 rounded-xl"
          outer-class="w-full"
          label-class="label label-text"
          message-class="label-text-alt mt-2 text-error"
        />
        <FormKit
          v-if="products"
          type="select"
          label="Catégorie du produit"
          name="categoryId"
          outer-class="w-full"
          input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
          label-class="label label-text"
          message-class="label-text-alt mt-2 text-error"
          validation="required|categoryId"
          :options="{
            '': 'Choisir une catégorie',
            ...products.reduce((acc, product) => {
              acc[product.id] = product.name;
              return acc;
            }, {})
          }"
        />
        <FormKit
          v-if="restaurants"
          type="select"
          label="Restaurant du produit"
          name="restaurantId"
          outer-class="w-full"
          input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
          label-class="label label-text"
          message-class="label-text-alt mt-2 text-error"
          validation="required|restaurantId"
          :options="{
            '': 'Choisir un restaurant',
            ...restaurants.reduce((acc, restaurant) => {
              acc[restaurant.id] = restaurant.name;
              return acc;
            }, {})
          }"
        />
        <UButton size="md" type="submit" color="emerald" block>
          Se connecter
        </UButton>
        
    </FormKit>
</template>