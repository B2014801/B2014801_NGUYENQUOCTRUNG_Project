<template>
    <div v-if="isShowErrorMessage" class="mt-2 text-center">
        <strong class="text-danger">{{ isShowErrorMessage }}</strong>
    </div>

    <div>
        <LoginForm @submit:login="handleLogin" :errorLoginEmailOrPassword="errorLoginEmailOrPassword" />
    </div>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
import PetshopService from '@/services/petshop.service';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
import { cartStore } from '@/stores/main';
import Cartservice from '@/services/cart.service';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            isShowErrorMessage: '',
            loading: false,
            errorLoginEmailOrPassword: false,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),
        async getUser() {
            const auth = useAuthStore();
            await auth.loadAuthState();
            if (auth.user) {
                return auth.user.user;
            }
        },
        async handleLogin(user) {
            this.loading = true;

            try {
                const result = await this.login(user);
                if (result) {
                    try {
                        const user = await this.getUser();
                        console.log(user);
                        let cart = await Cartservice.getCarts(user._id);
                        let CartStore = cartStore();
                        CartStore.setAmount(cart.length);
                    } catch (error) {
                        console.log(error);
                    }
                    this.$router.push({ name: 'home' });
                }
            } catch (error) {
                this.errorLoginEmailOrPassword = true;
                // this.loading = false;
                // this.message = 'Đã có lỗi xảy ra.';
            }
        },
    },
    created() {
        document.title = 'Login';
    },
};
</script>

<style scoped></style>
