import { defineStore } from 'pinia';

interface AuthState {
    token: string | null;
}

export const useAuthStore = defineStore('auth', () => {
    // const token = useCookie('token')

    const token = ref(null);

    function setToken(newToken: string) {
        token.value = newToken;
    }

    function clearToken() {
        token.value = null;
    }

    const isAuthenticated = computed(() => token.value !== undefined || token.value !== null)

    return { token, setToken, clearToken, isAuthenticated };
},
    {
        persist: {
            storage: persistedState.cookiesWithOptions(),
            key: 'token'
        },
    }
);
