import { defineStore } from 'pinia';
import AuthService from '@/services/auth.service';
import { cartStore } from '@/stores/main';

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            user: null,
            isExpire: false,
        };
    },
    getters: {
        isUserLoggedIn(state) {
            return !!state.user && !!state.user.accessToken;
        },
        getExpired() {
            return this.isExpire;
        },
    },
    actions: {
        loadAuthState() {
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            let CartStore = cartStore();
            CartStore.setAmount(0);
        },
        async login(user) {
            const response = await AuthService.login(user);

            if (!response.accessToken) {
                this.logout();
                throw new Error('Whoops, no access token found!');
            }
            if (response.user.role == 'admin') {
                alert('Bạn không có quyền truy cập trang web này');
            } else {
                this.user = response;

                localStorage.setItem('user', JSON.stringify(response));

                return response;
            }
        },
        register(user) {
            this.user = null;
            return AuthService.register(user);
        },
        setExpired() {
            this.isExpire = true;
        },
    },
});
