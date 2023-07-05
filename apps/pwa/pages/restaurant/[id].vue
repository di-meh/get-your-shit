<script setup>
import { ref, onBeforeMount } from 'vue';

const { id } = useRoute().params;
const restaurant = ref(null);
const cart = useCartStore();
const modal = ref(null);
const selectedProduct = ref(null);
const selectedProductQuantity = ref(1);

onBeforeMount(async () => {
    const url = '/restaurant/' + id;
    const { data } = await useGatewayFetch(url);
    restaurant.value = data;
});

function addProductToCart(product) {
    const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: selectedProductQuantity.value,
        restaurantId: product.restaurantId,
    };
    cart.addToCart(productToAdd);
    selectedProductQuantity.value = 1;
}

function openModal(product) {
    selectedProduct.value = product;
    modal.value.showModal()
}

function resetProductQuantity() {
    selectedProductQuantity.value = 1;
}

</script>   

<template>
    <div class="flex justify-start pt-4 pl-4">
        <NuxtLink to="/"><button class="btn rounded-full min-h-fit p-3 h-fit"><i class='bx bx-left-arrow-alt text-2xl' ></i></button></NuxtLink>
    </div>
    <div v-if="restaurant" class="px-4">
        <h1 class="text-2xl font-bold mb-4 mt-4">{{ restaurant.value.name }}</h1>
        <div v-if="restaurant.value.products.length" class="flex flex-col gap-4 pb-2">
            <div v-for="product in restaurant.value.products" class="card w-full bg-neutral shadow-xl">
                <div class="flex lg:justify-between p-4 items-center flex-col lg:flex-row">
                    <div class="w-full flex flex-col align-center cardBody">
                        <h2 class="card-title">{{ product.name }}</h2>
                        <p class="lg:text-left description">{{ product.description }}</p>
                        <p class="text-left italic font-bold">{{ product.price }}€</p>
                    </div>
                    <div class="card-actions mt-2 w-full lg:justify-end">
                        <button class="btn w-full lg:w-auto" @click="openModal(product)">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Le shop n'a pas encore ajouté de produits</p>
        </div>
    </div>
    <div v-else>Loading...</div>
    <dialog class="modal" ref="modal">
        <form method="dialog" class="modal-box" v-if="selectedProduct">
            <div class="modal-header">
                <h3>Vous avez séléctioné : {{ selectedProduct.name }}</h3>
            </div>
            <div class="modal-body">
                <p>Quel quantité souhaitez vous acheter ?</p>
                <select class="select w-full max-w-xs mt-4" v-model="selectedProductQuantity">
                    <option v-for="n in 30" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>
            <div class="modal-action">
                <button class="btn bg-neutral border-0" @click="addProductToCart(selectedProduct)">Ajouter au
                    panier</button>
                <button class="btn" @click="resetProductQuantity">Close</button>
            </div>
        </form>
    </dialog>
</template>

<style scoped>
   .description {
    max-width: 100%;
    word-wrap: break-word;
   }

   @media (min-width:1100px) {
    .cardBody {
        max-width: 80%;
    }
   }

   @media (max-width:634px) {
    .cardBody {
        max-width: 100%;
        align-items: center;
        gap: 1rem;
    }

    .Modal {
        margin-top: 1rem;
    }
   }
</style>