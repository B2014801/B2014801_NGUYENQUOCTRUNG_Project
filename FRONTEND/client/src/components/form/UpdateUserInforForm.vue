<template>
    <Form @submit="handleSubmit" :validation-schema="UserUpdateValidate" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-12 text-center" v-if="isShowImg">
                <img
                    v-if="!imageUrl"
                    :src="user.img"
                    class="rounded-circle d-block mx-auto"
                    width="200"
                    height="200"
                    alt=""
                    style="object-fit: cover"
                />
                <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Selected Image"
                    class="rounded-circle d-block mx-auto"
                    width="200"
                    height="200"
                    style="object-fit: cover"
                />
                <label for="img" class="text-center bg-success text-white p-2 rounded mt-2">Tải ảnh lên </label>
                <Field type="file" id="img" name="img" class="d-none" v-model="user.img" @change="displayImage" />
                <ErrorMessage class="text-danger" name="img" />
            </div>

            <div :class="{ 'col-md-8 col-12 col-sm-12': true, 'mx-auto': isShowImg == true }">
                <h6 v-show="!isuserValid" class="text-center py-1" style="background-color: #d1f4da">
                    <i class="fa fa-warning me-2" style="color: #f7c102"></i> Vui lòng cập nhật thông tin
                </h6>

                <div>
                    <h6 v-if="countUpdateTime > 0" class="text-left my-2" style="color: #37e32a">
                        <i class="fa-solid fa-check"></i> Cập nhật thành công x {{ countUpdateTime }}
                    </h6>
                    <div class="form-group mb-2">
                        <label for="name">Họ và tên</label>
                        <Field type="text" class="form-control" name="name" id="hoten" v-model="user.name" />
                        <ErrorMessage class="text-danger" name="name" />
                    </div>
                    <div class="form-group mb-2">
                        <label for="email">Email</label>
                        <p type="text" class="form-control m-0" name="email">{{ user.email }}</p>
                    </div>
                    <div class="form-group mb-2">
                        <label for="phone">Số điện thoại</label>
                        <Field type="text" class="form-control m-0" name="phone" v-model="user.phone" />
                        <ErrorMessage class="text-danger" name="phone" />
                    </div>
                    <Address
                        :isClickSubmit="isClickSubmit"
                        @isChosenAddress="isChosenAddress"
                        @address:data="getAddressData"
                        :user_address="user.address"
                    >
                    </Address>
                    <div class="profile-update-btn">
                        <button class="btn btn-success" type="submit">Cập nhật</button>
                        <button
                            v-if="isShowImg"
                            class="btn btn-success"
                            name="doimatkhau"
                            data-toggle="modal"
                            data-target="#modal-doimk"
                        >
                            Đổi mật khẩu
                        </button>
                        <button v-if="isShowImg" @click.prevent="handleLogout" class="btn btn-danger">Đăng xuất</button>
                    </div>
                </div>

                <div id="modal-doimk" class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content border p-3">
                            <!-- <form action="" method="POST" @submit="ValidateDoimk"> -->
                            <div class="mb-2 form-group">
                                <label for="matkhau-moi" class="">Mật khẩu mới: </label>
                                <div class="input-group border w-100">
                                    <input
                                        id="matkhau-moi"
                                        name="matkhau-moi"
                                        type="password"
                                        class="form-control border-0"
                                    />
                                    <i
                                        @click="ShowPassword(document.querySelector('#matkhau-moi'))"
                                        class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                                    ></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="matkhau-moi-laplai" class="">Lập lại mật khẩu: </label>
                                <div class="input-group border w-100">
                                    <input
                                        id="matkhau-moi-laplai"
                                        name="matkhau-moi-laplai"
                                        type="password"
                                        class="form-control border-0"
                                    />
                                    <i
                                        @click="ShowPassword(document.querySelector('#matkhau-moi-laplai'))"
                                        class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                                    ></i>
                                </div>
                            </div>
                            <div class="display-inline mx-auto text-center mt-2">
                                <button class="btn btn-danger mr-2" name="doi-matkhau" type="submit">Gửi</button>
                                <a role="button" class="btn btn-danger" data-dismiss="modal">Huỷ</a>
                            </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    <Form :validation-schema="UserUpdateValidate"> </Form>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Address from '@/components/address/vietnamaddress.vue';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        Address,
    },
    props: {
        user: { type: Object },
        isShowImg: { type: Boolean, default: true },
        countUpdateTime: { type: Number, default: 0 },
    },
    data() {
        const UserUpdateValidate = yup.object().shape({
            name: yup
                .string()
                .required('Bạn chưa nhập tên')
                .min(2, 'tên phải có ít nhất 2 ký tự')
                .max(30, 'Tên ít hơn 30 ký tự'),

            phone: yup
                .string()
                .required('vui lòng nhập số điện thoại')
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
        });
        return {
            UserUpdateValidate,
            isClickSubmit: false,
            data_address: [],
            isChosenAddres: false,
            imageUrl: null,
            isuserValid: null,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.isClickSubmit = true;
                if (this.isChosenAddres) {
                    let formData = new FormData();

                    // Utility function to append object properties to FormData
                    function appendIfDefined(key, value) {
                        if (value !== undefined && value !== null) {
                            formData.append(key, value);
                        }
                    }
                    for (const key in this.user) {
                        if (this.user.hasOwnProperty(key)) {
                            appendIfDefined(key, this.user[key]);
                        }
                    }

                    this.$emit('submit:update', formData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        isChosenAddress(data) {
            this.isChosenAddres = data;
        },
        getAddressData(data) {
            this.data_address = data;
            this.user.address = data.selectedWard + ', ' + data.selectedDistrict + ', ' + data.selectedTown;
        },
        handleLogout() {
            const auth = useAuthStore();
            auth.logout();
            this.$router.push({ name: 'login' });
        },
        displayImage(event) {
            const file = event.target.files[0];

            if (file) {
                // Create a FileReader to read the image file
                const reader = new FileReader();

                // Define a callback for when the reading is completed
                reader.onload = (e) => {
                    // Set the image URL to the result of the FileReader
                    this.imageUrl = e.target.result;
                };

                // Read the image file as a data URL
                reader.readAsDataURL(file);
            } else {
                // If no file is selected, clear the image URL
                this.imageUrl = null;
            }
        },
        isShowUserNotvalid() {
            this.isUserDataValid.then((isValid) => {
                this.isuserValid = isValid;
            });
        },
    },
    computed: {
        async isUserDataValid() {
            try {
                // Use the validation schema to validate the data
                const result = await this.UserUpdateValidate.isValid(this.user);
                return result;
            } catch (error) {
                return false; // Data is not valid
            }
        },
    },
    watch: {
        'user.img'(newVal) {
            console.log(newVal);
        },
        user(newVal) {
            this.isUserDataValid.then((isValid) => {
                this.$emit('isUserDataValid', isValid);
                this.isuserValid = isValid;
            });
        },
    },
    mounted() {
        // You can use this.isUserDataValid as a function here to get the result.
        this.isUserDataValid.then((isValid) => {
            this.$emit('isUserDataValid', isValid);
            this.isuserValid = isValid;
        });
    },
};
</script>

<style lang="scss" scoped>
.profile-update-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
