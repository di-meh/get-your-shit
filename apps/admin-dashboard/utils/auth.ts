import { useJwt } from '@vueuse/integrations/useJwt'

export const authLogin = async (email: string, password: string) => {
  const toast = useToast()
  return await useGatewayFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
    onResponse (context) {
      const token = context.response._data.access_token
      const { payload } = useJwt(token)
      const cookie = useCookie('token')
      switch (payload.value.role) {
        case 'ADMIN':
          toast.add({
            title: 'Connexion réussie',
            description: 'Vous allez être redirigé vers votre espace admin'
          })
          cookie.value = token
          navigateTo('/admin')
          break
        case 'CHIEF':
          toast.add({
            title: 'Connexion réussie',
            description: 'Vous allez être redirigé vers votre espace chef'
          })
          cookie.value = token
          navigateTo('/chief')
          break
        default:
          toast.add({
            title: 'Erreur',
            description: "Vous n'avez pas les droits pour vous connecter"
          })
          break
      }

      // TODO: Faire du code plus propre
    },
    onResponseError (context) {
      toast.add({
        title: 'Erreur',
        description: context.response._data.message
      })
    }
  })
}

export const authRegister = async (data: any) => {
  const toast = useToast()
  return await useGatewayFetch('/demand/create', {
    method: 'POST',
    body: data,
    onResponse (context) {
      if (context.response.ok) {
        toast.add({
          title: 'Demande envoyée',
          description: 'Votre demande a bien été envoyée, vous recevrez un mail de confirmation dans les prochaines heures.',
          timeout: 5000
        })
      }
    },
    onResponseError (context) {
      toast.add({
        title: 'Erreur',
        description: context.error?.message ?? 'Une erreur est survenue lors de l\'envoi de votre demande, veuillez réessayer plus tard.',
        timeout: 5000
      })
    }
  })
}

export const authLogout = () => {
  const toast = useToast()
  const cookie = useCookie('token')
  cookie.value = ''
  toast.add({
    title: 'Déconnexion réussie',
    description: 'Vous allez être redirigé vers la page de connexion'
  })
  return navigateTo('/login')
}
