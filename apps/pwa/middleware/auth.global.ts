import { useJwt } from '@vueuse/integrations/useJwt'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server)
    return
  const store = useUserStore()
  const hasCookie = store.hasCookie
  const cookie = useCookie('token')
  const { header, payload } = useJwt(cookie.value)

  if (to.path === '/forgot-password' && !hasCookie)
    return

  if (to.name === 'reset-password-hash' && !hasCookie)
    return

  if (to.path === '/register' && !hasCookie)
    return

  if (to.path !== '/login' && !hasCookie)
    return navigateTo('/login')

  // if (hasCookie) {
  //   if (payload.value.role === 'DELIVERY') {
  //      if (to.path === '/profile' || to.path === '/logout' || to.path === '/delivery/*') {
  //       return
  //     } else {
  //       if (to.path !== '/delivery') {
  //         return navigateTo('/delivery')
  //       }
  //     }
  //   }
  // }
})
