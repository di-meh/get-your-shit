import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */

  const cookie = useCookie('token')

  const hasCookie = computed(()=> !!cookie.value)

  function setCookie(value: string) {
    cookie.value = value
  }

  function logout() {
    cookie.value = ''
  }

  return {
    cookie,
    hasCookie,
    setCookie,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))