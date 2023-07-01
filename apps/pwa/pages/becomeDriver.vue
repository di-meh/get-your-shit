<script setup>
import { useToast } from "vue-toastification";

const cities = ref(null)
const selectedCity = ref('')
const activeDiv = ref('bike');
const reponse = await useFetch('https://geo.api.gouv.fr/departements')
const cookie = useCookie('token')
const toast = useToast();

cities.value = reponse.data.value.filter((city) => city.code <= '95')

const setActiveDiv = (type) => {
    activeDiv.value = type;
};

const becomeDriver = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    await useFetch('http://localhost:3000/demand/driver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie.value
        },
        body: JSON.stringify({
            departement: selectedCity.value,
            vehicule_type: activeDiv.value,
            date_birth: form.get('birthday')
        }),
        onResponse({ response }) {
            if (response.ok) {
                toast.success('Votre demande a bien été envoyé')
                navigateTo('/profile')
            }
        },
        onResponseError({ error }) {
            toast.error('Une erreur est survenue')
        }
    })

};


</script>


<template>
    <div class="px-4">
        <form @submit="becomeDriver($event)" class="w-full flex flex-col items-center">
            <div class="flex flex-col lg:w-1/4 w-full">
                <h1>Devenir livreur</h1>
                <p>Dans quelle departement souhaitez-vous rouler ?</p>
                <select class="select w-full mt-4" v-model="selectedCity">
                    <option value="" disabled selected>Choisissez une ville</option>
                    <option v-for="city in cities" :key="city.code" :value="city.code">
                        {{ city.code }} - {{ city.nom }}
                    </option>
                </select>
            </div>
            <div class=" lg:w-1/4 w-full mt-4">
                <p>Type de véhicule</p>
                <div class="flex justify-between mt-4">
                    <div class="p-2 m-2 border-[3px] w-full" :class="{ active: activeDiv === 'bike' }"
                        @click="setActiveDiv('bike')">
                        <p class="text-lg">Vélo</p>
                        <i class="bx bx-cycling text-3xl"></i>
                    </div>
                    <div class="p-2 m-2 border-[3px] w-full" :class="{ active: activeDiv === 'scooter' }"
                        @click="setActiveDiv('scooter')">
                        <p class="text-lg">Scooter</p>
                        <i class="bx bx-cycling text-3xl"></i>
                    </div>
                    <div class="p-2 m-2 border-[3px] w-full" :class="{ active: activeDiv === 'car' }"
                        @click="setActiveDiv('car')">
                        <p class="text-lg">Voiture</p>
                        <i class="bx bx-car text-3xl"></i>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/4 w-full flex flex-col mt-4">
                <label for="birthday">Date de naissance</label>
                <input type="date" id="birthday" name="birthday" class="input mt-4">
                <button class="btn bg-neutral mt-3">Envoyer</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.active {
    border: #18342B 3px solid;
}
</style>