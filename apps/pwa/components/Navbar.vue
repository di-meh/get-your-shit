<template>
    <div class="menu">
        <ul>
            <NuxtLink to="/home" class="link">
                <li><i class='bx bxs-home'></i><span>Acceuil</span></li>
            </NuxtLink>
            <NuxtLink to="/search" class="link">
                <li><i class='bx bx-search'></i><span>Parcourir</span></li>
            </NuxtLink>
            <NuxtLink to="/cart" class="link">
                <li><i class='bx bxs-cart'></i><span>Paniers</span></li>
            </NuxtLink>
            <NuxtLink to="/profile" class="link">
                <li><i class='bx bxs-user'></i><span>Compte</span></li>
            </NuxtLink>
        </ul>
    </div>
</template>

<style>
/* menu */
.menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
}

.menu>ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
}

.menu>ul>.link>li {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
}

.menu>ul>.link>li>i {
    font-size: 2rem;
}

.menu>ul>.link {
    padding: 1em;
    text-decoration: none;
}

.menu>ul>a:hover {
    cursor: pointer;
}
</style>