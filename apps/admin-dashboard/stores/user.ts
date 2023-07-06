import { defineStore } from 'pinia'
import { useJwt } from '@vueuse/integrations/useJwt'

export const useUserStore = defineStore('user', () => {
  const token = useCookie('token')
  const isLoggedIn = computed(() => !!token.value)
  const login = (email: string, password: string) => {
    const toast = useToast()
    return useGatewayFetch('/auth/login', {
      method: 'POST',
      body: { email, password },
      onResponse(context) {
        if (context.response.ok) {
          const accessToken = context.response._data.access_token
          const { payload } = useJwt(accessToken)
          switch (payload.value.role) {
            case 'ADMIN':
              toast.add({
                title: 'Connexion réussie',
                description: 'Vous allez être redirigé vers votre espace admin',
              })
              token.value = accessToken
              navigateTo('/admin')
              break
            case 'CHIEF':
              toast.add({
                title: 'Connexion réussie',
                description: 'Vous allez être redirigé vers votre espace chef',
              })
              token.value = accessToken
              navigateTo('/chief')
              break
            default:
              toast.add({
                title: 'Erreur',
                description: 'Vous n\'avez pas les droits pour vous connecter',
              })
              break
          }
        }
        // TODO: Faire du code plus propre
      },
      onResponseError(context) {
        toast.add({
          title: 'Erreur',
          description: context.response._data.message,
        })
      },
    })
  }
  const logout = () => {
    const toast = useToast()
    token.value = null
    toast.add({
      title: 'Déconnexion réussie',
      description: 'Vous allez être redirigé vers la page de connexion',
    })
    return navigateTo('/login')
  }

  return { token, isLoggedIn, login, logout }
})
