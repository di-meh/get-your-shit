<template>
  <div class="h-screen flex items-center justify-center flex-col">
    <h1 class="font-bold text-2xl mb-8">Choisissez un nouveau mot de passe</h1>
    <form @submit.prevent="resetPassword($event)" class="flex flex-col items-center space-y-8">
      <div class="form-control">
        <label for="password" class="label label-text">Mot de passe</label>
        <input class="input w-full max-w-xs" name="password" type="password" />
      </div>
      <div class="form-control">
        <label for="password_confirm" class="label label-text">Confirmation du mot de passe</label>
        <input class="input w-full max-w-xs" name="password_confirm" type="password" />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">Envoyer</button>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const isLoading = ref(false)
const { hash } = useRoute().params
const url = `/auth/reset-password/${hash}`
const toast = useToast()

await useGatewayFetch(url, {
  key: hash,
  async onResponse ({ response }) {
    if (response.ok) {
      const validRoles = ['USER', 'DELIVERY']
      if (!validRoles.includes(response._data.user.role)) {
        toast.error('Votre rôle est invalide. Veuillez réessayer.')
        await navigateTo('/login')
      }
    }
  },
  async onResponseError () {
    toast.error('Une erreur est survenue. Veuillez réessayer.')
    await navigateTo('/login')
  }
})

async function resetPassword(event) {
  isLoading.value = true
  const password = event.target.password.value
  const password_confirm = event.target.password_confirm.value
  if (password !== password_confirm) {
    toast.error('Les mots de passe ne correspondent pas.')
    isLoading.value = false
    return
  }

  const body = { password, hash }
  const resetUrl = '/auth/reset-password'
  await useGatewayFetch(resetUrl, {
    method: 'POST',
    body,
    async onResponse({response}) {
      if (response.ok) {
        toast.success('Votre mot de passe a été réinitialisé.')
        await navigateTo('/login')
      }
    },
    onResponseError() {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }
  })
  isLoading.value = false
}
useHeadSafe({
  title: 'Réinitialiser votre mot de passe',
  meta: [
    {
      name: 'description',
      content: 'Réinitialisez votre mot de passe pour continuer.'
    }
  ]
})
definePageMeta({
  layout: 'empty'
})
</script>