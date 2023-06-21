<script setup>

import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

console.log(authStore.isAuthenticated);


</script>


<template>
    <div class="first">
        <div class="head">
            <p>Nikola Panic</p>
            <span><i class='bx bxs-user'></i></span>
        </div>
        <div class="second">
            <div class="card">
                <span><i class='bx bxs-heart'></i></span>
                <p>Favoris</p>
            </div>
            <div class="card">
                <span><i class='bx bxs-credit-card'></i></span>
                <p>Cartes</p>
            </div>
            <div class="card">
                <span><i class='bx bxs-cart'></i></span>
                <p>Commandes</p>
            </div>
        </div>
        <span id="separator"></span>
        <div class="third">
            <div>
                <span><i class='bx bxs-purchase-tag' ></i></span>
                <p>Promotions</p>
            </div>
            <div>
                <span><i class='bx bxs-cog' ></i></span>
                <p>Paramètres</p>
            </div>
            <div>
                <span><i class='bx bx-help-circle'></i></span>
                <p>Aide</p>
            </div>
            <div>
                <span><i class='bx bxs-info-circle'></i></span>
                <p>À propos</p>
            </div>
            <div>
                <span><i class='bx bx-log-out'></i></span>
                <p>Déconnexion</p>
            </div>
        </div>
    </div>
</template>

<style>

.first {
    padding-left: 1em;
    padding-right: 1em;
}

.first > .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.first > .head > p {
    font-size: 1.5rem;
    font-weight: bold;
}

.first > .head > span {
    font-size: 2rem;
}



.first > .second {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.first > .second > .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px;
}

.first > .second > .card > span {
    font-size: 2rem;
    margin-bottom: 10px;
}

.first > .second > .card > p {
    font-size: 1rem;
    font-weight: bold;
}


.first > .third {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    padding-left: 1em;
}

.first > .third > div {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
}

.first > .third > div > span {
    font-size: 2rem;
    margin-right: 10px;
}

.first > .third > div > p {
    font-size: 1rem;
    font-weight: bold;
}


span#separator {
    display: block;
    width: 100%;
    height: 8px;
    background-color: #f5f5f5;
    margin-top: 1em;
    margin-bottom: 1em;
}



</style>