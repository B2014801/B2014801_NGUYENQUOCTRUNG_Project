<template>
    <div class="container w-50 border border-primary rounded my-3 p-0">
        <h3 class="bg-success text-white p-2 text-organ text-center">Chào mừng bạn đến với shop thú cưng</h3>
        <Form @submit="submitLogin" :validation-schema="loginValidate">
            <div class="m-3">
                <div class="form-group font-weight-bold">
                    <label for="email">Email <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            value=""
                            class="form-control"
                            placeholder="Vui lòng nhập vào email của bạn"
                            v-model="user.email"
                        />
                    </div>
                    <strong class="text-danger"><ErrorMessage name="email"></ErrorMessage></strong>
                </div>
                <div class="form-group font-weight-bold">
                    <label for="password" class="my-2">Mật khẩu <strong class="text-danger">(*)</strong></label>
                    <div class="input-group border">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            value=""
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                            v-model="user.password"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-input-matkhau'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <strong class="text-danger"><ErrorMessage name="password"></ErrorMessage></strong>
                </div>
                <div class="form-group form-check my-2">
                    <Field type="checkbox" id="remember" name="nho-mat-khau" class="form-check-input" />
                    <label for="remember" class="form-check-label">Ghi nhớ tôi</label>
                </div>
                <div>
                    <button class="btn btn-info" type="submit">Đăng nhập</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        const loginValidate = yup.object().shape({
            email: yup.string().required('Vui lòng nhập email'),
            password: yup.string().required('Vui lòng nhập mật khẩu'),
        });
        return {
            loginValidate,
            user: {
                email: '',
                password: '',
                position: 'normal',
            },
        };
    },
    emits: ['submit:login'],
    methods: {
        submitLogin() {
            this.$emit('submit:login', this.user);
        },
    },
};
</script>

<style scoped></style>
