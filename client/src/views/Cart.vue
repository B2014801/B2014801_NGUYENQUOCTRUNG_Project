<template>
    <div class="row mx-md-5 mx-1 my-2">
        <div class="my-2">
            <h2 class="text-center">Giỏ Hàng</h2>
            <div class="text-center">
                <intersecting-circles-spinner
                    v-if="isShowLoading"
                    class="mx-auto"
                    :animation-duration="1200"
                    :size="50"
                    color="#ff1d5e"
                />
            </div>
        </div>
        <h6 v-if="isShowUpdateCartSuccess" class="text-left mb-2" style="color: #37e32a">
            <i class="fa-solid fa-check"></i> Giỏ hàng đã được cập nhật
        </h6>
        <h6 v-if="isShowDeleteProductOutOfCartSuccess" class="text-left mb-2" style="color: #37e32a">
            <i class="fa-solid fa-check"></i> {{ recentDeleteProduct.name }} đã xóa khỏi giỏ hàng
        </h6>
        <div v-if="isShowCart" class="col-12 col-md-8 table-responsive-sm">
            <table class="cart-product-table">
                <tr>
                    <th class="col" colspan="3">Sản phẩm</th>
                    <th class="col">giá</th>
                    <th class="col">số lượng</th>
                    <th class="col">tạm tính</th>
                </tr>
                <tbody>
                    <tr v-for="(product, index) in cart">
                        <td>
                            <a
                                @click="handleDeleteProductOutOfCart(product.UserId, product.ProductId, index)"
                                class="text-dark text-decoration-none"
                                ><i class="fa-sharp fa-solid fa-xmark delete-purchase-icon"></i
                            ></a>
                        </td>
                        <td>
                            <img class="m-2" width="130" height="100" :src="product.ProductData.img" alt="" />
                        </td>
                        <td style="width: 400px">{{ product.ProductData.name }}</td>
                        <td>
                            <span>{{ product.ProductData.price }} ₫</span>
                        </td>
                        <td>
                            <Form>
                                <div class="Cart-UpdateOrder-Number">
                                    <button @click.prevent="handleMinusOrderProduct(index)" id="minus-sp">-</button>
                                    <Field
                                        class="inputOrderNumber"
                                        type="number"
                                        name="amount"
                                        size="2"
                                        value="1"
                                        style="outline: none"
                                        v-model="product.Amount"
                                        @input="inputChanged = true"
                                    />
                                    <button @click.prevent="handlePlusOrderProduct(index)" id="plus-sp">+</button>
                                    <ErrorMessage name="order_number" class="text-danger ms-2" />
                                </div>
                            </Form>
                        </td>
                        <td>
                            <span>{{ getTemporaryPriceOfOneProduct(product.ProductData.price, product.Amount) }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <Form @submit="updateCart" class="form-update-amount">
                                <button
                                    :disabled="!isAmountInputChanged"
                                    id="submit-btn"
                                    type="submit"
                                    :class="{ btn: true, 'btn-primary': true, 'my-1': true }"
                                >
                                    <HalfCircleSpinner
                                        v-if="isShowLoadingUpdateCart"
                                        class="mx-auto"
                                        :animation-duration="1200"
                                        :size="20"
                                        color="#4f0b14"
                                        style="position: absolute"
                                    />
                                    cập nhật giỏ hàng
                                </button>
                            </Form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="isShowCart" class="col">
            <table class="cart-product-table">
                <tr>
                    <th colspan="2" class="width-100 text-center">CỘNG GIỎ HÀNG</th>
                </tr>
            </table>
            <table class="cart-product-table">
                <tbody>
                    <tr>
                        <td>Tạm tính</td>
                        <td class="text-end">
                            <span>{{ getTemporaryPrice }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Tổng</td>
                        <td class="text-end">
                            <span name="tongtien">{{ getTemporaryPrice }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div></div>

            <router-link to="/checkout"
                ><button :disabled="isShowLoadingUpdateCart" class="btn btn-danger w-100 mt-2">
                    Thanh toán
                </button></router-link
            >
        </div>
        <div v-if="isShowEmptyCart"><h6 class="text-center mt-3">Thêm hàng vào giỏ ngay!!</h6></div>
    </div>
</template>

<script>
import { IntersectingCirclesSpinner, HalfCircleSpinner } from 'epic-spinners';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import CartService from '@/services/cart.service';
import { cartStore } from '@/stores/main';
import { useAuthStore } from '@/stores/auth.store';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        IntersectingCirclesSpinner,
        HalfCircleSpinner,
    },
    data() {
        const OrderNumberValidate = yup.object().shape({
            amount: yup.number(),
        });
        return {
            OrderNumberValidate,
            cart: [],
            recentDeleteProduct: {},
            isShowCart: false,
            isShowUpdateCartSuccess: false,
            isShowDeleteProductOutOfCartSuccess: false,
            isShowEmptyCart: false,
            isShowLoading: true,
            isShowLoadingUpdateCart: false,
            inputChanged: false,
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
        async getCart() {
            try {
                const user = await this.getUser();

                this.cart = await CartService.getCarts(user._id);
                if (this.cart.length != 0) {
                    this.isShowCart = true;
                    this.isShowLoading = false;
                } else {
                    this.isShowEmptyCart = true;
                    this.isShowCart = false;
                }
            } catch (error) {
                this.$router.push({ name: 'login' });
            }
        },
        handleMinusOrderProduct(index) {
            if (this.cart[index].Amount >= 2) {
                this.cart[index].Amount--;
                this.enableBtnUpdateCarts;
            }
        },
        handlePlusOrderProduct(index) {
            if (this.cart[index].Amount < 10) {
                this.cart[index].Amount++;
                this.enableBtnUpdateCarts;
            }
        },

        async updateCart() {
            this.isShowLoadingUpdateCart = true;
            const user = await this.getUser();
            const result = await CartService.updateCart(user._id, this.cart);
            if (result) {
                this.isShowUpdateCartSuccess = true;
                this.isShowDeleteProductOutOfCartSuccess = false;
                this.isShowLoadingUpdateCart = false;
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
        async handleDeleteProductOutOfCart(UserId, ProductId, index) {
            this.recentDeleteProduct = this.cart[index].ProductData;
            const result = await CartService.delete(UserId, ProductId);
            if (result) {
                this.isShowDeleteProductOutOfCartSuccess = true;
                this.isShowUpdateCartSuccess = false;
                this.getCart();
                let CartStore = cartStore();
                CartStore.minusAmount();
            }
        },
    },
    computed: {
        getTemporaryPrice() {
            if (this.cart.length != 0) {
                const temporary_price = this.cart.reduce(
                    (total, item) => total + item.Amount * item.ProductData.price.replace(/\./g, ''),
                    0,
                );
                // if (temporary_price) {
                return this.formatNumberWithDot(temporary_price);
                // }
            }
        },
        enableBtnUpdateCarts() {
            this.inputChanged = true;
        },
        isAmountInputChanged() {
            return this.inputChanged;
        },

        // enableBtnCheckOut(){
        //     return
        // },
    },

    created() {
        this.getCart();
        document.title = 'Cart';
    },
};
</script>

<style lang="scss" scoped>
// .giohang-hienthi {
//     position: relative;
// }
.form-update-amount {
    text-align: center;
    button {
        position: relative;

        div {
            position: absolute;
            left: 0;
            right: 0;
            top: 8px;
        }
    }
}
.cart-product-table {
    width: 100%;
    border: 2px dashed #a48c8ca8;
    border-collapse: collapse;
    margin-bottom: 6px;
    th,
    td {
        border: 2px dashed #a48c8ca8;
        padding: 10px;
    }
    th {
        text-transform: uppercase;
    }

    span {
        padding: 0 4px;
        white-space: nowrap;
    }
    .delete-purchase-icon {
        border-radius: 50%;
        border: 1px solid #000;
        padding: 4px;
        background-color: #fff;
        &:hover {
            background-color: pink;
        }
    }
}
</style>
