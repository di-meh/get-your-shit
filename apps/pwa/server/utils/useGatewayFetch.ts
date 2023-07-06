import { defu } from 'defu'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export default function useGatewayFetch<T extends NitroFetchRequest>(url: string, options: NitroFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaults: NitroFetchOptions<T> = {
    baseURL: config.public.serverGatewayUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const params = defu(options, defaults)
  return $fetch(url, params)
}
