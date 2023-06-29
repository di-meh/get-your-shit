<script setup>
await nextTick();

const { data: restaurants, pending, refresh } = useGatewayFetch('/restaurant')

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
      <div class="bg-neutral">
        <i class='bx bx-search'></i>
        <input type="text" @input="search()" placeholder="Rechercher un restaurant...">
      </div>
    </div>
    <div class="restaurant">
      <div class="card" v-for="restaurant in restaurants">
        <NuxtLink :to="`/restaurant/${restaurant.id}`" class="links">
          <span>
            <p :id=restaurant.name>{{ restaurant.name }}</p>
            <p> {{ restaurant.address }}, {{ restaurant.city }}</p>
          </span>
        </NuxtLink>

      </div>
    </div>
  </div>
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
  width: 90%;
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
  width: 90%;
  border-radius: 1rem;
}

.restaurant>.card > .links >span {
  display: flex;
  
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 1rem;
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

@media (min-width: 1280px) {
  .searchbar {
    width: 100%;
  }

  .searchbar>div {
    width: 50%;
  }


  .restaurant>.card {
    flex-direction: row;
    align-items: center;
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
