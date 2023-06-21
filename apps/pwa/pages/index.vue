<script setup>
import { ref, onMounted } from 'vue'

let restaurants = [
    {
        name: "Pizza Hut",
        location: "Sceaux",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Paris",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Boulogne",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
    {
        name: "Pizza Hut",
        location: "Clamart",
        deliveryPrice: 4.99,
        deliveryTime: "35-50min",
        image: "../images/PizzaHut-header-2280x900px.jpg"
    },
]


onMounted(() => {
    // window.onscroll = function () { makeNavSticky() };
    // let searchbar = document.querySelector(".searchbar");
    // let sticky = searchbar.offsetTop;
    // let restaurant = document.querySelector(".restaurant");
    // function makeNavSticky() {
    //     if (window.pageYOffset >= sticky) {
    //         searchbar.classList.add("sticky")
    //         restaurant.style.marginTop = "5.2em";
    //         restaurant.style.marginBottom = "5.2em";
    //     } else {
    //         searchbar.classList.remove("sticky");
    //         restaurant.style.marginTop = "0";
    //         restaurant.style.marginBottom = "0";
    //     }
    // }
})

</script>

<template>
    <div class="container">
        <div class="first">
            <div>
                <p>Livrer maintenant</p>
                <p>1 rue du test <i class='bx bx-chevron-down'></i></p>
            </div>
            <div>
            </div>
        </div>
        <div class="searchbar">
            <div>
                <i class='bx bx-search'></i>
                <input type="text" placeholder="Rechercher un restaurant...">
            </div>
        </div>

        <div class="restaurant">
            <div class="card" v-for="restaurant in restaurants">
                <img :src="restaurant.image" alt="">

                <p :id=restaurant.name :data=restaurant.location>{{ restaurant.name }} - {{ restaurant.location }}</p>
                <p>{{ restaurant.deliveryPrice }}€ - {{ restaurant.deliveryTime }}</p>

            </div>
        </div>

    </div>
</template>

<style>
/* Search bar */

.searchbar {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
}

.searchbar>div {
    display: flex;
    align-items: center;
    width: 90%;
    border-radius: 2222222px;
    padding-left: 1rem;
    background-color: rgb(231, 231, 231);
}

.searchbar>div>i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
}

.searchbar>div>input {
    border: none;
    outline: none;
    width: 100%;
    background: none;
    font-size: 1rem;
    line-height: 3em;
}

/* Restaurants cards */

.restaurant {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.restaurant>.card {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;

    width: 90%;
    border-radius: 1rem;
}

.restaurant>.card>img {
    width: 100%;
    border-radius: 1rem;
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    margin: 0;
    padding-top: 1em;
    padding-bottom: 1em;
}
</style>