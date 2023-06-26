import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())
  const cookie = useCookie('token')

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))
  const hasCookie = computed(()=> !!cookie.value)

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }
  function setCookie(value: string) {
    cookie.value = value
  }

  return {
    setNewName,
    otherNames,
    savedName,
    cookie,
    hasCookie,
    setCookie
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))