<script setup>
const { hash } = useRoute().params
const url = `/auth/reset-password/${hash}`
const isLoading = ref(false)
const toast = useToast()
await useGatewayFetch(url, {
  key: hash,
  async onResponse ({ response }) {
    if (response.ok) {
      const validRoles = ['ADMIN', 'CHIEF']
      if (!validRoles.includes(response._data.user.role)) {
        toast.add({
          title: 'Erreur',
          description: 'Votre rôle est invalide. Veuillez réessayer.'
        })
        await navigateTo('/login')
      }
    }
  },
  async onResponseError () {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue. Veuillez réessayer.'
    })
    await navigateTo('/login')
  }
})

async function resetPassword(credentials) {
  const body = {
    password: credentials.password,
    hash
  }
  isLoading.value = true
  const resetUrl = '/auth/reset-password'
  await useGatewayFetch(resetUrl, {
    method: 'POST',
    body,
    async onResponse({response}) {
      if (response.ok) {
        toast.add({
          title: 'Mot de passe réinitialisé',
          description: 'Vous pouvez maintenant vous connecter'
        })
        await navigateTo('/login')
      }
    },
    onResponseError() {
      toast.add({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.'
      })
    }
  })
  isLoading.value = false
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen flex-1 h-full">
    <div class="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="text-2xl font-bold leading-9 tracking-tight text-center lg:text-left">
            Réinitialisez votre mot de passe
          </h2>
        </div>

        <div class="mt-10">
          <div>
            <FormKit type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6" :actions="false" @submit="resetPassword">
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
              <FormKit
                type="password"
                name="password_confirm"
                label="Confirmation du mot de passe"
                validation="required|confirm"
                input-class="input input-bordered input-primary w-full mt-2 w-full"
                outer-class="w-full"
                label-class="label label-text"
                message-class="label-text-alt mt-2 text-error"
              />
              <UButton size="md" type="submit" :loading="isLoading" block>
                Réinitialisez votre mot de passe
              </UButton>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
