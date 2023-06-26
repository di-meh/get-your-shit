<script setup>

</script>


<template>
    <div class="container">
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
                    <i class='bx bxs-baguette'></i>
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
                    <i class='bx bxs-baguette'></i>
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
                    <i class='bx bxs-baguette'></i>
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
                    <i class='bx bxs-baguette'></i>
                </div>
                <p>Burgers</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
.container {
    padding: 1em;
    max-width: 100%;
}

.cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    grid-gap: 1em;
    margin-top: 1em;
}

.cats div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #18342B;
    border-radius: 1rem;
    padding: 1em;
    width: -webkit-fill-available;
    margin: 0 1em;
    transition: all 0.2s ease-in-out;
}

.cats>div:hover {
    cursor: pointer;
    transform: scale(1.02);
}

.cats div i {
    font-size: 2rem;
}

.cats div p {
    font-size: 1rem;
}


/* desktop */

@media (min-width: 1280px) {
    .cats {
        grid-template-columns: repeat(4, 1fr);
    }

    .cats div {
        width: 100%;
        margin: 0;
    }

    .cats div p {
        font-size: 1.2rem;
    }

    .cats div i {
        font-size: 2.5rem;
    }
}
</style>