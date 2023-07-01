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
    <h1>Edit profile</h1>
    <div v-if="userInfos">
        <form class="flex flex-col px-12" @submit="updateUser($event)">
            <input name="username" class="input" type="text" :value=userInfos.username />
            <input name="email" class="input" type="email" :value=userInfos.email />
            <input name="phone" class="input" type="number" :value=userInfos.phone />
            <input name="date_birth" class="input" type="date" :value=dateBirth />
            <input name="address" type="text" autocomplete="address-line1" placeholder="Address" class="input"
                :value=userInfos.address />
            <input name="city" class="input" placeholder="City" type="text" autocomplete="address-level2"
                :value=userInfos.city />
            <input class="input" name="postcode" placeholder="Postcode" type="text" autocomplete="postal-code"
                :value=userInfos.postal_code />
            <input type="password" class="input" placeholder="Password" name="password" />
            <input type="password" class="input" placeholder="Confirm password" name="password_confirmation" />
            <button class="btn btn-neutral">Edit</button>
        </form>
    </div>
    <div v-else>Loading...</div>
</template>