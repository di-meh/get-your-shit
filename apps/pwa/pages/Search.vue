<template>
    <div class="container">
        <div class="searchbar-search">
            <div>
                <i class='bx bx-search'></i>
                <input type="text" placeholder="Plat, courses alimentaires, boissons, etc.">
            </div>
        </div>
        <h3>Meilleures catégories</h3>
        <div class="cats">
            <div>
                <div>
                    <i class='bx bxs-pizza'></i>
                </div>
                <p>Pizza</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-coffee'></i>
                </div>
                <p>Café</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-cookie'></i>
                </div>
                <p>Desserts</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-baguette' ></i>
                </div>
                <p>Burgers</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-pizza'></i>
                </div>
                <p>Pizza</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-coffee'></i>
                </div>
                <p>Café</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-cookie'></i>
                </div>
                <p>Desserts</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-baguette' ></i>
                </div>
                <p>Burgers</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-pizza'></i>
                </div>
                <p>Pizza</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-coffee'></i>
                </div>
                <p>Café</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-cookie'></i>
                </div>
                <p>Desserts</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-baguette' ></i>
                </div>
                <p>Burgers</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-pizza'></i>
                </div>
                <p>Pizza</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-coffee'></i>
                </div>
                <p>Café</p>
            </div>
            <div>
                <div>
                    <i class='bx bx-cookie'></i>
                </div>
                <p>Desserts</p>
            </div>
            <div>
                <div>
                    <i class='bx bxs-baguette' ></i>
                </div>
                <p>Burgers</p>
            </div>
        </div>

    </div>
</template>

<style>

.cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 5em;
}

.cats>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    border: 1px solid #e1e1e1;
    border-radius: 0.5rem;
}

.container > h3 {
    margin-left : 1rem;
    margin-top: 6em;
}

.cats>div>div {
    width: 5rem;
    height: 5rem;
    width: 100%;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cats>div>div>i {
    font-size: 2rem;
}

.cats>div>p {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
}

.cats>div:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.searchbar-search {
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;    
    width: 100%;
    padding-top : 1rem;
    padding-bottom : 1rem;
    margin-top: 0 !important;
    z-index: 1;
}

.searchbar-search>div {
    display: flex;
    align-items: center;
    width: 90%;
    border-radius: 2222222px;
    padding-left: 1rem;
    margin-left: 1rem;
    background-color: rgb(231, 231, 231);
}

.searchbar-search>div>i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
}

.searchbar-search>div>input {
    border: none;
    outline: none;
    width: 100%;
    background: none;
    font-size: 1rem;
    line-height: 3em;
}



@media screen and (min-width: 768px) {
    .cats {
        grid-template-columns: repeat(4, 1fr);
    }
}



</style>