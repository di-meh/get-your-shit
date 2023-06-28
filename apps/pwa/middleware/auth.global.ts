

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  const store = useUserStore()
  const hasCookie = store.hasCookie
  if (to.path === '/register' && !hasCookie) {
    return ;
  }
  if (to.name === 'verify-email-hash' && !hasCookie) {
    return ;
  }
  if (to.path !== '/login' && !hasCookie ) {
    return navigateTo('/login')
  } 
  
})



