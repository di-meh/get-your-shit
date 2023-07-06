import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export default function useGatewayFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const userAuth = useCookie('token')

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.gatewayUrl,
    key: url,
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},
  }
  const params = defu(options, defaults)
  return useFetch(url, params)
}
