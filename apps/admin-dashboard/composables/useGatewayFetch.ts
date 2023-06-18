import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default function useGatewayFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const userAuth = useCookie('token')
  const toast = useToast()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.gatewayUrl,
    key: url,
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},
    onResponseError ({ response, error }): Promise<void> | void {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          toast.add({
            title: 'Vous n\'êtes pas autorisé à effectuer cette action',
            description: 'Veuillez vous reconnecter'
          })
          navigateTo('/login')
        } else {
          toast.add({
            title: 'Une erreur s\'est produite',
            description: error?.message ?? 'Veuillez réessayer'
          })
        }
      }
    }
  }
  const params = defu(options, defaults)
  return useFetch(url, params)
}
