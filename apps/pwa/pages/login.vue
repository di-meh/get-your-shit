<script setup>
import { useToast } from "vue-toastification";
definePageMeta({
    layout: 'empty'
})

const login = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')
    const toast = useToast();
    const userStore = useUserStore()

    const data = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (data.ok) {
        const token = await data.json()
        userStore.setCookie(token.access_token)
        toast.success("Vous êtes connecté");
        navigateTo('/')
    }


}

</script>

<template>
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">Login</h1>
      </div>
      <div class="login-content">
        <form @submit="login($event)" class="login-form">
          <input type="email" name="email" placeholder="Email" class="input" />
          <input type="password" name="password" placeholder="Password" class="input" />
          <button class="btn" type="submit">Login</button>
        </form>
        <p class="login-text">Vous n'avez pas de compte ? <NuxtLink to="/register" class="login-link">Inscription</NuxtLink></p>
      </div>
    </div>
  </template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-content {
    width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 80%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn {
  width: 40%;
  height: 40px;
  background-color: #18342B;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #1e4136;
}

.login-text {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.login-link {
  color: #10B981;
}

/* tablet */

@media (min-width: 738px) {
    .input {
        width: 40%;
    }

    .btn {
        width: 20%;
    }
}


/* desktop */

@media (min-width: 1280px) {
    .input {
        width: 20%;
    }

    .btn {
        width: 10%;
    }
}




</style>

