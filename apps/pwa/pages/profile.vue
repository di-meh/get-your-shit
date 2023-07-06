<script setup>
import { useJwt } from '@vueuse/integrations/useJwt'
const cookie = useCookie('token')
const { header, payload } = useJwt(cookie.value)
const userName = payload.value.username
const role = payload.value.role

if (role === 'DELIVERY') {
    console.log(role)
    setPageLayout('delivery')
} else {
    console.log('default')
    definePageMeta({
        layout: 'default'
    })
}



</script>

<template>
    <div class="first">
        <p>{{ userName }}</p>
        <i class="bx bx-user"></i>
    </div>
    <div v-if="role !== 'DELIVERY'" class="second">
        <NuxtLink to="/orders">
            <div class="bg-neutral">
                <i class='bx bx-cart'></i>
                <p>Commandes</p>
            </div>
        </NuxtLink>
    </div>
    <div class="divider" v-if="role !== 'DELIVERY'"></div>
    <div class="third">
        <NuxtLink to="/editProfile" class="links hover:bg-neutral rounded-full">
            <div>
                <i class='bx bx-cog'></i>
                <p>Paramètres</p>
            </div>
        </NuxtLink>
        <NuxtLink v-if="role !== 'DELIVERY'" to="/becomeDriver" class="links hover:bg-neutral rounded-full">
            <div>
                <i class='bx bx-user-check'></i>
                <p>Devenir un livreur</p>
            </div>
        </NuxtLink>
        <NuxtLink to="/logout" class="links hover:bg-neutral rounded-full">
            <div>
                <i class='bx bx-log-out'></i>
                <p>Déconnexion</p>
            </div>
        </NuxtLink>

    </div>
</template>

<style scoped>
.first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
}

.first p {
    font-size: 1.5rem;
}

.first i {
    font-size: 1.5rem;
}

.second {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    padding-top: 3em;
    color: white;
}

.second div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    padding: 1em;
    width: 100px;
}

.second div i {
    font-size: 2rem;
}

.second div p {
    font-size: 1rem;
}

.divider {
    height: 1px;
    width: 100%;
    margin-top: 4em;
    background-color: rgb(231, 231, 231);
}

.third {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
    color: white;
}

.third .links {
    width: 100%;
}

.third .links div {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1em;
}


.third .links div i {
    font-size: 1.5rem;
}

.third div p {
    font-size: 1.2rem;
    margin-left: 1em;
}



@media (min-width: 738px) {
    .first {
        height: 80px;
    }

    .first p {
        font-size: 1.8rem;
    }

    .first i {
        font-size: 1.8rem;
    }

    .second {
        height: 80px;
        padding-top: 0;
    }

    .second div {
        width: 120px;
    }

    .second div i {
        font-size: 2.5rem;
    }

    .second div p {
        font-size: 1.2rem;
    }

    .divider {
        margin-top: 5em;
    }

    .third {
        padding: 0 40px;
    }

    .third .links div {
        padding: 1.5em;
    }

    .third .links div i {
        font-size: 2rem;
    }

    .third div p {
        font-size: 1.5rem;
    }
}


/* desktop */

@media (min-width: 1280px) {
    .first {
        height: 100px;
    }

    .first p {
        font-size: 2rem;
    }

    .first i {
        font-size: 2rem;
    }

    .second {
        height: 100px;
        padding-top: 0;
    }

    .second div {
        width: 150px;
    }

    .second div i {
        font-size: 3rem;
    }

    .second div p {
        font-size: 1.5rem;
    }


    .third {
        padding: 0 40px;
    }

    .third .links div {
        padding: 1.5em;
    }

    .third .links div i {
        font-size: 2rem;
    }

    .third div p {
        font-size: 1.5rem;
    }
}
</style>