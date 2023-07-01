

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  const store = useUserStore()
  const hasCookie = store.hasCookie
  if (to.path === '/forgot-password' && !hasCookie) {
    return ;
  }
  if (to.name === 'reset-password-hash' && !hasCookie) {
    return ;
  }
  if (to.path === '/register' && !hasCookie) {
    return ;
  }
  if (to.path !== '/login' && !hasCookie ) {
    return navigateTo('/login')
  } 
  
})



