<script setup>
import { autofill } from '@mapbox/search-js-web';
import { useToast } from "vue-toastification";
const userInfos = ref(null)
const toast = useToast()
const dateBirth = ref(null)

onMounted(async () => {
    const { data: user, pending, refresh } = useGatewayFetch('/auth/profile', {
        onResponse({ response }) {
            if (response.ok) {
                userInfos.value = response._data
            }
        }
    }).then(() => {
        const dateTimeString = userInfos.value.date_birth;
        const date = new Date(dateTimeString);
        const formattedDate = date.toISOString().split('T')[0];
        dateBirth.value = formattedDate
        autofill({
            accessToken: 'pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag'
        })
    }).catch(() => {
        console.error('error')
    })
})

function updateUser(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    let password = form.get('password')
    let password_confirmation = form.get('password_confirmation')

    if (password !== password_confirmation) {
        toast.error("Les mots de passe ne correspondent pas");
        return
    }

    let inputData = Object.fromEntries(form.entries());
    for (const [key, value] of Object.entries(inputData)) {
        if (value === "") {
            delete inputData[key];
        }
    }

    const { data: user, pending, refresh } = useGatewayFetch('/user/me', {
        method: 'PUT',
        body: inputData,
        onResponse({ response }) {
            if (response.ok) {
                userInfos.value = response._data
                toast.success("Votre profil a été mis à jour");
                navigateTo('/profile')
            }
        }
    }).catch(() => {
        console.error('error')
    })
}
</script>

<template>
    <div class="flex justify-start pt-4 pl-4">
        <NuxtLink to="/profile"><button class="btn rounded-full min-h-fit p-3 h-fit"><i class='bx bx-left-arrow-alt text-2xl' ></i></button></NuxtLink>
    </div>
    <h1 class="text-2xl m-8 font-bold">Edit profile</h1>
    <div v-if="userInfos" class="w-full mx-auto">
        <form class="flex flex-col lg:grid lg:grid-cols-2 gap-4 px-12 lg:px-24 my-8 text-left" @submit="updateUser($event)">
            <div class="form-control">
                <label for="username" class="label label-text">Nom</label>
                <input id="username" name="username" class="input" type="text" :value=userInfos.username />
            </div>
            <div class="form-control">
                <label for="email" class="label label-text">Email</label>
                <input id="email" name="email" class="input" type="email" :value=userInfos.email />
            </div>
            <div class="form-control">
                <label for="phone" class="label label-text">Phone</label>
                <input id="phone" name="phone" class="input" type="number" :value=userInfos.phone />
            </div>
            <div class="form-control">
                <label for="date_birth" class="label label-text">Tel</label>
                <input id="date_birth" name="date_birth" class="input" type="date" :value=dateBirth />
            </div>
            <div class="form-control">
                <label for="address" class="label label-text">Address</label>
                <input id="address" name="address" type="text" autocomplete="address-line1" placeholder="Address"
                    class="input" :value=userInfos.address />
            </div>
            <div class="form-control">
                <label for="city" class="label label-text">Ville</label>
                <input id="city" name="city" class="input" placeholder="City" type="text" autocomplete="address-level2"
                    :value=userInfos.city />
            </div>
            <div class="form-control">
                <label for="postcode" class="label label-text">Code postale</label>
                <input id="postcode" class="input" name="postcode" placeholder="Postcode" type="text"
                    autocomplete="postal-code" :value=userInfos.postal_code />
            </div>
            <div class="form-control">
                <label for="password" class="label label-text">Mot de passe</label>
                <input id="password" type="password" class="input" placeholder="Password" name="password" />
            </div>
            <div class="form-control lg:col-span-full">
                <label for="password_confirmation" class="label label-text">Confirmer le mot de passe</label>
                <input id="password_confirmation" type="password" class="input" placeholder="Confirmer le mot de passe"
                    name="password_confirmation" />
            </div>
            <button class="btn btn-neutral lg:col-span-full">Edit</button>
        </form>
    </div>
    <div v-else>Loading...</div>
</template>