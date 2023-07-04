<script setup>
definePageMeta({
    layout: 'chief'
});
import { autofill } from '@mapbox/search-js-web';
const route = useRoute();
const toast = useToast();
const restaurantRef = ref(null);
onMounted(async () => {
    const { data: restaurant } = useGatewayFetch(`/restaurant/${route.params.id}`, {
        onResponse({ response }) {
            restaurantRef.value = response._data;
            console.log(restaurantRef.value)
        }
    }).then(() => {
        autofill({
            accessToken: 'pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag'
        })
    })
});

function updateRestaurant(event) {
    console.log(event)
    useGatewayFetch(`/restaurant/update/${route.params.id}`, {
        method: 'PUT',
        body: {
            name: event.name,
            phone: event.phone,
            address: event.address,
            city: event.city,
            postal_code: event.postal_code,
        },
        onResponse({ response }) {
            if (response.ok) {
                toast.add({
                    title: 'Le restaurant ' + response._data.name + ' a bien été modifié',
                    description: 'Le restaurant a bien été modifié',
                })
                navigateTo('/chief/restaurants')
            }
        }
    })
}




</script>

<template>
    <FormKit v-if="restaurantRef" type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6"
        :actions="false" @submit="updateRestaurant($event)">
        <FormKit type="text" name="name" label="Nom du restaurant" placeholder="Nom du restaurant"
            validation="required|name" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
            outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
            :value="restaurantRef.name" />
        <FormKit type="number" name="phone" label="Telephone du restaurant" placeholder="Telephone du restaurant"
            validation="required|phone" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
            outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
            :value="restaurantRef.phone" />
        <FormKit type="text" name="address" label="Address du restaurant" placeholder="Address du restaurant"
            validation="required|address" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
            outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
            autocomplete="address-line1" :value="restaurantRef.address" />
        <FormKit type="text" name="city" label="Ville du restaurant" placeholder="Ville du restaurant"
            validation="required|address" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
            outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
            autocomplete="address-level2" :value="restaurantRef.city" />
        <FormKit type="text" name="postal_code" label="Code postale du restaurant" placeholder="Code postale du restaurant"
            validation="required|address" input-class="input input-bordered input-accent mt-2 w-full rounded-xl"
            outer-class="w-full" label-class="label label-text" message-class="label-text-alt mt-2 text-error"
            autocomplete="postal-code" :value="restaurantRef.postal_code" />

        <UButton size="md" type="submit" color="emerald" block>
            Modifier
        </UButton>
    </FormKit>
</template>