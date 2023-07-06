<script setup>
await nextTick()

const { data: restaurants, pending, refresh } = useGatewayFetch('/restaurant')
const { data: user, pending: pendingUser, refresh: refreshUser } = useGatewayFetch('/user/me')

function search(event) {
  const search = event.target.value
  const restaurants = document.querySelectorAll('.restaurant .card')
  restaurants.forEach((restaurant) => {
    if (restaurant.querySelector('p').id.toLowerCase().includes(search.toLowerCase()))
      restaurant.style.display = 'block'
    else
      restaurant.style.display = 'none'
  })
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="container relative lg:mb-28">
    <div class="first">
      <div class="m-4 ">
        <p>Livrer maintenant</p>
        <p v-if="user">
          {{ user.address }}
        </p>
      </div>
      <div />
    </div>
    <div class="searchbar">
      <div class="bg-neutral">
        <i class="bx bx-search" />
        <input type="text" placeholder="Rechercher un shop..." @input="search($event)">
      </div>
    </div>
    <div class="restaurant">
      <div v-for="restaurant in restaurants" class="card p-4">
        <span>
          <p :id="restaurant.name">{{ restaurant.name }}</p>
          <p> {{ restaurant.address }}, {{ restaurant.city }}</p>
        </span>
        <NuxtLink :to="`/restaurant/${restaurant.id}`">
          <button class="btn w-full mt-2">
            Voir
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
  <NuxtLink to="/restaurant/aroundMe">
    <button class="btn bg-neutral seeRestaus">
      Voir sur la carte
    </button>
  </NuxtLink>
  <button class="fixed right-8 bottom-20 bg-neutral rounded-full min-h-fit p-3 h-fit" @click="backToTop()">
    <i class="bx bx-chevron-up" />
  </button>
</template>

<style scoped>
.container {
  max-width: 100%;
}

/* Search bar */

.searchbar {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.searchbar>div {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding-left: 1rem;
  width: 100%;
}

.searchbar>div>i {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.searchbar>div>input {
  border: none;
  background-color: transparent;
  outline: none;
  color: white;
  font-size: 1rem;
  width: 100%;
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
  width: 100%;
  border-radius: 1rem;
  line-height: 2em;
  transition: 0.3s;
  border: 2px solid #18342B;
}

.restaurant>.card:hover {
  background-color: #18342B;
}

.restaurant>.card>.links>span {
  display: flex;

  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 1rem;
}

.seeRestaus {
  position: fixed;
  bottom: 6em;
  left: 50%;
  transform: translateX(-50%);
}

.sticky {
  position: sticky;
  top: 1em;
  z-index: 100;
}

@media (max-width: 634px) {
  .searchbar {
    width: 100%;
  }

  .searchbar>div {
    width: 90%;
  }

  .restaurant {
    padding-bottom: 5em;
  }

  .restaurant>.card {
    width: 90%;
    background-color: #18342B;
  }

  .restaurant>.card>.links>span {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 1rem;
  }
}

/* tablet */

@media (min-width: 738px) {
  .searchbar {
    width: 100%;
  }

  .searchbar>div {
    width: 70%;
  }

  .restaurant>.card {
    width: 70%;
  }

}

/* desktop */

@media (min-width: 1000px) {
  .searchbar {
    width: 100%;
  }

  .searchbar>div {
    width: 50%;
  }

  .restaurant>.card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 50%;
  }

  .restaurant>.card>span {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 1rem;
  }

}
</style>
