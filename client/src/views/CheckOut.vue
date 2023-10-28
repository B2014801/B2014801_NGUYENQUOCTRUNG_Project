<template>
    <div v-if="isShowCheckOut" class="container row mx-auto mt-2">
        <div class="col-md-6 col-12 mb-2">
            <!-- <form> -->
            <h3 class="col-12 pl-0">Thông tin thanh toán</h3>

            <UpdateUserForm
                :countUpdateTime="countUpdateTime"
                :user="User"
                :isShowImg="false"
                @submit:update="handleUpdateUser"
                @isUserDataValid="isUserDataValid"
            />
        </div>

        <div class="col-md-6 col-12 mb-2 col" style="border: 2px solid blue">
            <Form @submit="handleCheckOut" :validation-schema="PaymentMethodValidate">
                <div style="padding: 20px">
                    <h6 v-if="isShowCheckOutSuccess" class="text-start mb-2" style="color: #37e32a">
                        <i class="fa-solid fa-check"></i> Đặt hàng thành công
                    </h6>
                    <intersecting-circles-spinner
                        v-if="isShowLoading"
                        class="mx-auto"
                        :animation-duration="1200"
                        :size="50"
                        color="#ff1d5e"
                    />
                    <h3 class="text-upercase">Đơn hàng của bạn</h3>
                    <table class="CheckOut-Product-table">
                        <tr>
                            <th>Sản phẩm</th>
                            <th class="text-end">Tạm tính</th>
                        </tr>

                        <tr v-for="(Product, index) in CheckOutData">
                            <td>
                                {{ Product.ProductData.name }} <b> x{{ Product.Amount }} </b>
                            </td>
                            <td class="text-end">
                                <b>{{ getTemporaryPriceOfOneProduct(Product.ProductData.price, Product.Amount) }}</b>
                            </td>
                        </tr>
                    </table>
                    <hr class="my-2" />
                    <div class="checkout-detail">
                        <div>
                            <b>Chi tiết thanh toán </b>
                        </div>
                        <div>
                            <span>Tổng tiền hàng </span>
                            <span>{{ getTemporaryPrice }}</span>
                        </div>
                        <div>
                            <span>Tổng tiền phí vận chuyển </span>
                            <span>15.000 ₫</span>
                        </div>
                        <div v-for="index in selectedvoucher2">
                            <span>{{ vouchers[index].name }}</span>
                            <span>{{ vouchers[index].discount }}%</span>
                        </div>
                        <div>
                            <span><b>Tổng thanh toán</b></span>
                            <span class="text-danger fw-bold">{{ getTotalPrice }}</span>
                        </div>
                    </div>
                    <hr class="my-2" />
                    <div class="form-inline">
                        <!-- <form> -->
                        <div class="accordion form-group col-12">
                            <div>
                                <div v-if="isShowErrorChoosePaymentMethod" class="my-1">
                                    <span name="PaymentMethod" class="text-danger"
                                        >Vui lòng chọn hình thức thanh toán</span
                                    >
                                </div>
                                <div class="form-group" id="headingOne">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="checkboxOne"
                                        name="PaymentMethods"
                                        v-model="isChooseMethodPayment"
                                    />
                                    <label class="ms-2" for="checkboxOne"><b>Hình thức thanh toán</b></label>
                                </div>
                                <hr class="my-2" />
                                <div v-if="isChooseMethodPayment">
                                    <div>
                                        <div class="form-group" id="headingTwo">
                                            <Field
                                                class="form-check-input"
                                                type="radio"
                                                value="inPersion"
                                                name="PaymentMethod"
                                                id="checkboxTwo"
                                                v-model="isChooseOneMethodPayment"
                                            />
                                            <label class="form-check-label ms-2" for="checkboxTwo"
                                                >Thanh toán khi nhận hàng</label
                                            >
                                        </div>
                                    </div>
                                    <hr class="my-2" />
                                    <div>
                                        <div class="form-group">
                                            <Field
                                                class="form-check-input"
                                                type="radio"
                                                value="online"
                                                name="PaymentMethod"
                                                id="checkboxThree"
                                                v-model="isChooseOneMethodPayment"
                                            />
                                            <label class="form-check-label ms-2" for="checkboxThree"
                                                >Thanh toán online</label
                                            >
                                        </div>
                                        <div v-if="isChooseOneMethodPayment == 'online'" class="p-3 bg-light">
                                            <p>
                                                Thông tin tài khoản thụ hưởng của Pet shop. Sau khi chuyển khoản, xin
                                                vui lòng thông báo cho chúng tôi qua số điên thoại 0925 086 811 để được
                                                phục vụ nhanh nhất.
                                            </p>
                                            <p>Ngân hàng: <b>Agribank</b></p>
                                            <p>Số tài khoản: <b>076582640</b></p>
                                            <p>Tên tài khoản: <b>NGUYỄN QUỐC TRUNG</b></p>
                                            <div class="text-center">
                                                <img src="img/thanhtoan/qr.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </form> -->
                    </div>
                    <div>
                        <button :disabled="isShowLoading" class="btn btn-danger mt-2" type="submit">Đặt hàng</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    <div v-if="isShowEmptyCheckOut"><h6 class="text-center mt-3">Chưa có sản phẩm thanh toán!!</h6></div>
    <!-- <div v-if="showVoucherModal" class="voucher-list-container">
        <div class="voucher-list">
            <h3>trung</h3>
        </div>
    </div> -->
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { IntersectingCirclesSpinner } from 'epic-spinners';

import CartService from '@/services/cart.service';
import UserService from '@/services/user.service';
import { useAuthStore } from '@/stores/auth.store';
import InvoiceService from '@/services/invoice.service';
import UpdateUserForm from '@/components/form/UpdateUserInforForm.vue';

import * as yup from 'yup';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        IntersectingCirclesSpinner,
        UpdateUserForm,
    },
    data() {
        return {
            CheckOutData: [],
            User: {},
            vouchers: [],
            selectedvoucher: [],
            selectedvoucher2: [], // to not rerender
            isShowCheckOut: false,
            isChooseMethodPayment: false,
            isChooseOneMethodPayment: null,
            isShowCheckOutSuccess: false,
            isShowErrorChoosePaymentMethod: false,
            isShowEmptyCheckOut: false,
            isShowLoading: false,
            countUpdateTime: 0,
            showVoucherModal: false,
            isuserDataValid: null,
        };
    },
    methods: {
        async getUser() {
            const auth = useAuthStore();
            await auth.loadAuthState();
            if (auth.user) {
                return auth.user.user;
            } else {
                alert('Bạn phải đăng nhập trước');
                this.$router.push({ name: 'login' });
            }
        },
        async getCheckOutData() {
            try {
                const user = await this.getUser();
                this.CheckOutData = await CartService.getCarts(user._id);
                this.User = await UserService.getUser(user._id);
                if (this.CheckOutData.length != 0 && Object.keys(this.User).length != 0) {
                    this.isShowCheckOut = true;
                } else {
                    console.log(this.User);
                    // this.isShowEmptyCart = true;
                    this.isShowCheckOut = false;
                    this.isShowEmptyCheckOut = true;
                }
            } catch (error) {
                // alert('vui lòng đăng nhập trước');
                // this.$router.push({ name: 'login' });
                console.log(error);
            }
        },
        isUserDataValid(data) {
            console.log(data);
            this.isuserDataValid = data;
        },

        async handleUpdateUser(data) {
            try {
                const result = await UserService.update(data);
                if (result) {
                    this.countUpdateTime++;
                    this.getCheckOutData();
                }
            } catch (error) {
                console.log(error);
            }
        },
        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getTemporaryPriceOfOneProduct(price, amount) {
            const priceInt = price.replace(/\./g, ''); //1.000.000 to 1000000

            const priceFinal = this.formatNumberWithDot(priceInt * amount);
            return priceFinal;
        },

        async getDetail() {
            let Detail = [];
            this.CheckOutData.map((item, index) =>
                Detail.push({
                    _id: item.ProductData._id,
                    name: item.ProductData.name,
                    price: item.ProductData.price,
                    amount: item.Amount,
                }),
            );
            return Detail;
        },
        async handleCheckOut() {
            try {
                if (this.isuserDataValid) {
                    if (this.isChooseOneMethodPayment) {
                        this.isShowLoading = true;
                        const user = await this.getUser();
                        const Detail = await this.getDetail();

                        let data = {
                            UserId: user._id,
                            PaymentMethod: this.isChooseOneMethodPayment,
                            Detail: Detail,
                        };
                        const result = await InvoiceService.create(data);
                        if (result) {
                            this.isShowLoading = false;
                            this.isShowCheckOutSuccess = true;
                        }
                    } else {
                        this.isShowErrorChoosePaymentMethod = true;
                    }
                } else {
                    alert('vui lòng cập nhật thông tin');
                }
            } catch (error) {
                console.log(error);
            }
        },
        toggleDisplayError() {
            // if (this.isChooseOnethodPayment) {
            this.isShowErrorChoosePaymentMethod = false;
            // }
        },

        closeModel() {
            this.showVoucherModal = false;
        },
    },
    computed: {
        getTemporaryPrice() {
            if (this.CheckOutData.length != 0) {
                const temporary_price = this.CheckOutData.reduce(
                    (total, item) => total + item.Amount * item.ProductData.price.replace(/\./g, ''),
                    0,
                );

                return this.formatNumberWithDot(temporary_price);
            }
        },
        getTotalPrice() {
            const products_price = this.CheckOutData.reduce(
                (total, item) => total + item.Amount * item.ProductData.price.replace(/\./g, ''),
                0,
            );
            let discount_percent = 0;
            // if (!this.showVoucherModal) {
            discount_percent = this.selectedvoucher2.reduce(
                (total, itemindex) => total + this.vouchers[itemindex].discount,
                0,
            );
            // }
            const total = products_price - (products_price * discount_percent) / 100 + 15000;
            return this.formatNumberWithDot(total);
        },
    },
    watch: {
        isChooseOneMethodPayment: 'toggleDisplayError',
        showVoucherModal(newValue) {
            if (newValue == false) {
                this.selectedvoucher2 = this.selectedvoucher;
            }
        },
    },
    created() {
        this.getCheckOutData();
        document.title = 'Checkout';
    },
};
</script>

<style lang="scss" scoped>
.checkout-infor-namephone {
    display: flex;
    justify-content: space-between;
    div {
        width: 48% !important;
    }
}
.CheckOut-Product-table {
    width: 100%;
    border: 2px dashed #a48c8ca8;
    border-collapse: collapse;
    margin-bottom: 6px;
    th,
    td {
        border: 2px dashed #a48c8ca8;
        padding: 10px;
    }
}
.voucher-container {
    margin: 0 auto;
    width: 50%;
    background-color: #fff;
    & > div {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .voucher-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        i:hover {
            color: rgb(118, 128, 114);
            cursor: pointer;
        }
    }
    .voucher-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            font-size: 12px;
            margin: 0;
        }
        &:hover {
            background-color: rgb(225, 245, 219);
            cursor: pointer;
        }
    }
}
.checkout-detail {
    padding: 0 10px;
    div {
        margin: 4px 0;
        display: flex;
        justify-content: space-between;
    }
}
</style>
