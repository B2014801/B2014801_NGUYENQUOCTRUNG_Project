<template>
    <div class="container col-md-6 col-10 border border-primary rounded p-0 my-2">
        <Form @submit="handleSubmitCreate" :validation-schema="validateCreate">
            <h3 class="bg-success text-white p-2 text-organ text-center">Tạo tài khoản</h3>
            <div class="m-3">
                <div class="form-group font-weight-bold">
                    <label for="name">Họ tên <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            class="form-control"
                            placeholder="Họ tên"
                            v-model="formData.name"
                        />
                    </div>
                    <ErrorMessage name="name" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="email">Email <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Vui lòng nhập vào email của bạn"
                            v-model="formData.email"
                        />
                    </div>
                    <ErrorMessage name="email" class="text-danger" />
                    <span v-if="isShowFailRegister" name="email" class="text-danger">email đã tồn tại</span>
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="phone">Phone <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            type="phone"
                            id="phone"
                            name="phone"
                            class="form-control"
                            placeholder="Vui lòng nhập phone của bạn"
                            v-model="formData.phone"
                        />
                    </div>
                    <ErrorMessage name="phone" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="password">Mật khẩu <strong class="text-danger">(*)</strong> </label>
                    <div class="input-group border">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                            v-model="formData.password"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-dangky'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <ErrorMessage name="password" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="password_repeat">Lặp lại mật khẩu <strong class="text-danger">(*)</strong> </label>
                    <div class="input-group border">
                        <Field
                            id="password_repeat"
                            name="password_repeat"
                            type="password"
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-dangky-laplai'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <ErrorMessage name="password_repeat" class="text-danger" />
                </div>
                <Address
                    :isClickSubmit="isClickSubmit"
                    @isChosenAddress="isChosenAddress"
                    @address:data="getAddressData"
                >
                </Address>
                <div class="btn-login-register-container">
                    <button class="btn btn-info me-4" name="dangky" type="submit">Đăng ký</button>
                    <button to="/login" class="btn btn-info" name="dangky" @click="goToLogin">Đăng nhập</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Address from '@/components/address/vietnamaddress.vue';

export default {
    props: {
        isShowFailRegister: { type: Boolean, default: false },
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        Address,
    },
    data() {
        const validateCreate = yup.object().shape({
            name: yup
                .string()
                .required('Bạn chưa nhập tên')
                .min(2, 'tên phải có ít nhất 2 ký tự')
                .max(30, 'Tên ít hơn 30 ký tự'),
            email: yup
                .string()
                .required('Bạn chưa nhập email')
                .email('email không hợp lệ')
                .max(40, 'email nhỏ hơn 40 ký tự '),
            password: yup
                .string()
                .required('Bạn chưa nhập mật khẩu')
                .max(100, 'Mật khẩu tối đa 100 ký tự.')
                .min(8, 'Tối thiểu 8 ký tự'),
            password_repeat: yup
                .string()
                .required('Mật khẩu không khớp')
                .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
            phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
        });
        return {
            validateCreate,
            formData: {
                // Initialize an empty object to store form data
                name: '',
                email: '',
                phone: '',
                password: '',
            },
            address_data: {},
            isClickSubmit: false,
            isChosenAddres: false,
        };
    },

    emits: ['create:account'],
    methods: {
        async handleSubmitCreate() {
            try {
                this.isClickSubmit = true;
                if (this.isChosenAddres) {
                    this.$emit('create:account', this.formData);
                }
            } catch (er) {
                console.log(er);
            }
            // truyền dữ liệu từ comp con đến comp cha
        },
        async handleSubmitCreateOauth(data) {
            this.$emit('create:account', data);
        },
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
        getAddressData(data) {
            this.formData.address = data.selectedWard + ', ' + data.selectedDistrict + ', ' + data.selectedTown;
        },
        isChosenAddress(bl) {
            this.isChosenAddres = bl;
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-login-register-container {
    display: flex;
    justify-content: center;
    margin: 15px 0;
}
</style>
