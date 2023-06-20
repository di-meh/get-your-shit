<template>
    <div class="login">
        <img src="../images/ubereats.png" />
        <h1>Connexion</h1>
        <form class="form" @submit="login($event)">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" name="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <p>Vous n'avez pas de compte ? <NuxtLink to="/register">Inscrivez-vous</NuxtLink>
            </p>
        </form>
    </div>
</template>

<script setup>

async function login(e) {
    e.preventDefault();
    const config = useRuntimeConfig()
    const url = config.public.gatewayUrl // http://localhost:3000
    let form = new FormData(e.target);
    let email = form.get("email");
    let password = form.get("password");

    const data = await useFetch(url + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

}

</script>

<style>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.login>img {
    width: 200px;
    margin-bottom: 1rem;
}

.login>h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.login>.form {
    width: 90%;
}

.login>.form>input {
    width: -webkit-fill-available;
    padding: 1rem;
    margin-bottom: 1rem;
    border: solid black 1px;
    outline: none;
}

.login>.form>button {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    outline: none;
    background-color: #06C167;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.login>.form>button:hover {
    background-color: #06C167;
    opacity: 0.8;
}

.login>.form>p {
    font-size: 1rem;
    text-align: center;
}

.login>.form>p>a {
    color: #06C167;
}


.login>.form>.link {
    text-decoration: none;
    color: #06C167;
    float: right;
    margin-bottom: 1rem;
}
</style>