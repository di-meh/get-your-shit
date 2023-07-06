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
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
