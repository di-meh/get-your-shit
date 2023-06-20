<template>
    <div class="login">
        <img src="../images/ubereats.png" />
        <h1>Inscription</h1>
        <form class="form" @submit="register($event)">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" name="email" required>
                <div class="invalid-feedback">
                    Veuillez saisir une adresse email valide.
                </div>
            </div>
            <div class="mb-3">
                <label for="username" class="form-label">Nom</label>
                <input type="text" class="form-control" id="username" name="username" required>
                <div class="invalid-feedback">
                    Veuillez saisir un nom valide.
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" required>
                <div class="invalid-feedback">
                    Veuillez saisir un mot de passe valide.
                </div>
            </div>
            <div class="mb-3">
                <label for="confirm_password" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                <div class="invalid-feedback">
                    Veuillez confirmer votre mot de passe.
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <p>Vous avez déjà un compte ? <NuxtLink to="/login">Connexion</NuxtLink>
            </p>
        </form>
    </div>
</template>

<script setup>

async function register(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let email = form.get("email");
    let username = form.get("username");
    let password = form.get("password");

    if (password != form.get("confirm_password")) {
        alert("Les mots de passe ne correspondent pas");
        return;
    } else {
        console.log(email, username, password);
        const data = await useFetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });


    }
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