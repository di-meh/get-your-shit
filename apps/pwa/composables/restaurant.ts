import { acceptHMRUpdate, defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'
import { useToast } from "vue-toastification";

const toast = useToast()

export const useRestaurantStore = defineStore('restaurants', () => {
    const { data: restaurant, isFinished } = useIDBKeyval('restaurants', [])

    function addRestaurants(resto: any) {
        restaurant.value.push(resto)
    }

    function clearRestaurants() {
        restaurant.value = []
    }

    function getRestaurants() {
        console.log('Getting restaurants:', restaurant.value)
        return restaurant.value
    }

    return {
        restaurant,
        addRestaurants,
        clearRestaurants,
        getRestaurants,
    }


})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useRestaurantStore, import.meta.hot))