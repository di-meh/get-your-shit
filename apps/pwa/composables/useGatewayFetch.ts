import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default function useGatewayFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const userAuth = useCookie('token')

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.gatewayUrl,
    key: url,
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},
    onResponseError ({ response, error }): Promise<void> | void {
      // Ici tu peux mettre de la logique par défaut quand ta requête ne passe pas
    }
  }
  const params = defu(options, defaults)
  return useFetch(url, params)
}