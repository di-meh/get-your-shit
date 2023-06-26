

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  const route = useRoute()
  const hasCookie = store.hasCookie
  if (to.path === '/register' && !hasCookie) {
    return ;
  }
  if (to.path !== '/login' && !hasCookie ) {
    return navigateTo('/login')
  } 
  
})



