import { useJwt } from '@vueuse/integrations/useJwt'

export default defineNuxtRouteMiddleware(() => {
  if (process.server) return
  const cookie = useCookie('token')
  const toast = useToast()
  if (cookie.value) {
    const { payload } = useJwt(cookie.value)
    if (payload.value?.role !== 'ADMIN') {
      return navigateTo('/login')
    }
  } else {
    toast.add({
      title: 'Erreur',
      description: "Vous n'avez pas les droits pour vous connecter"
    })
    return navigateTo('/login')
  }
})
