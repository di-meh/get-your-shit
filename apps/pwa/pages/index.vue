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









        <div class="menu">
            <ul>
                <a>
                    <li><i class='bx bxs-home'></i><span>Acceuil</span></li>
                </a>
                <a>
                    <li><i class='bx bx-search'></i><span>Parcourir</span></li>
                </a>
                <a>
                    <li><i class='bx bxs-cart'></i><span>Paniers</span></li>
                </a>
                <a>
                    <li><i class='bx bxs-user'></i><span>Compte</span></li>
                </a>
            </ul>
        </div>
    </div>
</template>

<style>
/* temporaire */

* {
    font-family: Arial, Helvetica, sans-serif;
}


.menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.menu>ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
}

.menu>ul>a>li {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu>ul>a>li>i {
    font-size: 2rem;
}


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
    padding: 1rem;
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
}


/* change placeholder color 
::placeholder {
    color: #000;
    opacity: 1;
}

*/

</style>