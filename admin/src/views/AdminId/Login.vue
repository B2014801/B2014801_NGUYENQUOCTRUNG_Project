<template>
    <div v-if="isShowErrorMessage" class="mt-2 text-center">
        <strong class="text-danger">{{ isShowErrorMessage }}</strong>
    </div>

    <div>
        <LoginForm @submit:login="handleLogin" />
    </div>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
// import PetshopService from '@/services/petshop.service';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            isShowErrorMessage: '',
            loading: false,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),

        async handleLogin(user) {
            this.loading = true;

            try {
                const result = await this.login(user);
                if (result) {
                    this.$router.push({ name: 'product' });
                }
            } catch (error) {
                console.log(error);

                this.loading = false;
                this.message = 'Đã có lỗi xảy ra.';
            }
        },
    },
    created() {
        document.title = 'Login';
    },
};
</script>

<style scoped></style>
