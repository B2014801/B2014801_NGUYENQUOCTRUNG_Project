<template>
    <!-- <div v-if="isShowFailRegister" class="mt-2 text-center">
        <strong class="success-create-account">Đăng ký thành công tiến hành đăng nhập</strong>
    </div> -->

    <div>
        <CreateAccountForm @create:account="createUser" :isShowFailRegister="isShowFailRegister" />
    </div>
</template>

<script>
import CreateAccountForm from '@/components/form/CreateAccountForm.vue';
import PetshopService from '@/services/petshop.service';

export default {
    components: {
        CreateAccountForm,
    },
    data() {
        return {
            accounts: [],

            isShowSuccessMessage: false,
            isShowFailRegister: false,
        };
    },
    methods: {
        async createUser(data) {
            try {
                const result = await PetshopService.createUser(data);
                if (result) {
                    this.isShowSuccessMessage = !this.isShowSuccessMessage;
                    alert('thành công');
                    this.goToLogin();
                } else {
                }
            } catch (error) {
                this.isShowSuccessMessage = false;
                this.isShowFailRegister = true;
            }
        },

        async goToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
    created() {
        document.title = 'Register';
    },
};
</script>

<style lang="scss" scoped>
.success-create-account {
    color: #37e32a;
}
</style>
