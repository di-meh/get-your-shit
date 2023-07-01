<script setup>
const isLoading = ref(false)
const toast = useToast()
async function forgotPassword({ email }) {
  isLoading.value = true
  await useGatewayFetch('/auth/forgot-password', {
    method: 'POST',
    body: { email },
    onResponse({ response }) {
      if (response.ok) {
        toast.add({
          title: 'Email envoyé',
          description: 'Un email vous a été envoyé pour réinitialiser votre mot de passe.',
        })
      }
    },
    onResponseError() {
      toast.add({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
      })
    },
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
            Mot de passe oublié ?
          </h2>
        </div>

        <div class="mt-10">
          <div>
            <FormKit type="form" form-class="flex flex-col w-full items-center lg:items-start gap-6" :actions="false" @submit="forgotPassword">
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
              <UButton size="md" type="submit" :loading="isLoading" block>
                Envoyer
              </UButton>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
