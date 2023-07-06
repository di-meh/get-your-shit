<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
useHeadSafe({
  title: 'Mot de passe oublié',
  meta: [
    {
      name: 'description',
      content: 'Réinitialisez votre mot de passe pour continuer.',
    },
  ],
})
definePageMeta({
  layout: 'empty',
})

async function forgotPassword(event) {
  const email = event.target.email.value
  await useGatewayFetch('/auth/forgot-password', {
    method: 'POST',
    body: { email },
    onResponse({ response }) {
      if (response.ok)
        toast.success('Un email vous a été envoyé pour réinitialiser votre mot de passe.')
    },
    onResponseError() {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    },
  })
}
</script>

<template>
  <div class="h-screen flex items-center justify-center flex-col">
    <h1 class="font-bold text-2xl mb-8">
      Mot de passe oublié ?
    </h1>
    <form class="flex flex-col items-center space-y-8" @submit.prevent="forgotPassword($event)">
      <div class="form-control">
        <label for="email" class="label label-text">Adresse mail</label>
        <input class="input w-full max-w-xs" name="email" type="email" placeholder="email@example.com">
      </div>
      <button type="submit" class="btn btn-primary">
        Envoyer
      </button>
    </form>
  </div>
</template>
