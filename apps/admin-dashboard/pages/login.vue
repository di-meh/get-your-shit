<template>
  <NuxtLayout name="empty">
    <div class="flex min-h-full flex-1 h-screen">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="text-2xl font-bold leading-9 tracking-tight text-center lg:text-left">
              Connectez-vous
            </h2>
          </div>

          <div class="mt-10">
            <div>
              <FormKit type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6" :actions="false" @submit="login">
                <FormKit
                  type="email"
                  name="email"
                  label="Adresse mail"
                  placeholder="email@example.com"
                  validation="required|email"
                  input-class="input input-bordered input-primary mt-2 w-full"
                  outer-class="w-full"
                  label-class="label label-text"
                  message-class="label-text-alt mt-2 text-error"
                />
                <FormKit
                  type="password"
                  name="password"
                  label="Mot de passe"
                  validation="required"
                  input-class="input input-bordered input-primary w-full mt-2 w-full"
                  outer-class="w-full"
                  label-class="label label-text"
                  message-class="label-text-alt mt-2 text-error"
                />
                <UButton size="md" type="submit" :loading="isLoading" block>
                  Se connecter
                </UButton>
              </FormKit>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="~/assets/img/weed2.jpg" alt="">
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const isLoading = ref(false)
const userStore = useUserStore()
definePageMeta({
  layout: false
})

async function login (credentials) {
  isLoading.value = true
  await userStore.login(credentials.email, credentials.password)
  isLoading.value = false
}
</script>
