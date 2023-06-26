<script setup>

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

// search bar function
const search = () => {
  let input = document.querySelector('input')
  let filter = input.value.toUpperCase()
  let cards = document.querySelectorAll('.card')

  for (let i = 0; i < cards.length; i++) {
    let p = cards[i].getElementsByTagName('p')[0]
    let txtValue = p.textContent || p.innerText

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = ""
    } else {
      cards[i].style.display = "none"
    }
  }
}

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
        <input type="text" @input="search()" placeholder="Rechercher un restaurant...">
      </div>
    </div>
    <div class="restaurant">
      <div class="card" v-for="restaurant in restaurants">
        <img :src="restaurant.image" alt="">
        <span>
          <p :id=restaurant.name :data=restaurant.location>{{ restaurant.name }} - {{ restaurant.location }}</p>
          <p>{{ restaurant.deliveryPrice }}€ - {{ restaurant.deliveryTime }}</p>
        </span>
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
  background-color: #18342B;
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

.restaurant>.card>img {
  width: 100%;
  border-radius: 1rem;
}

.restaurant>.card>span {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  .restaurant>.card>img {
    width: 30%;
    border-radius: 1rem;
  }

  .restaurant>.card>span {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 1rem;
  }

  .restaurant>.card>span>p:first-child {
    font-size: 1.2rem;
  }

  .restaurant>.card>span>p:last-child {
    font-size: 1rem;
  }

  .restaurant>.card>span>p:last-child:before {
    content: "•";
    margin-right: 0.5rem;
  }

  .restaurant>.card>span>p:last-child:after {
    content: "•";
    margin-left: 0.5rem;
  }


}
</style>
