<template>
    <div class="container">
        <hr />
        <!-- <h3 class="text-center text-uppercase">{{ getTitle }}</h3> -->
        <h6 v-if="isShowCanCelOrderSuccess" class="text-success text-center">
            <i class="fa-solid fa-check"></i>Đơn hàng đã được huỷ thành công x {{ getCountCanCelOrderSuccess }}
        </h6>
        <table
            v-for="(invoice, index1) in invoices"
            class="table table-bordered table-responsive-sm shadow w-75 mx-auto"
        >
            <tbody>
                <tr>
                    <td colspan="2">
                        <p v-html="getIconAndStatus(invoice.status)"></p>
                    </td>
                </tr>

                <tr v-for="(product, index2) in invoice.detail">
                    <td class="col-2">
                        <img class="ml-2" width="130" height="100" :src="product.img" alt="" />
                    </td>
                    <td>
                        <span
                            >{{ product.name }}<b> x {{ product.ordernumber }}</b></span
                        >
                        <p class="text-danger">{{ getPrice(product) }}</p>
                        <p class="mb-0">
                            Thành tiền: <b class="text-danger"> {{ getPriceWithAmount(product) }}</b>
                        </p>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="text-end">
                        <div>
                            <div>
                                <span class="me-2">Phí vận chuyển</span>
                                <span>15.000 ₫</span>
                            </div>
                        </div>
                        <hr />
                        <!-- <form method="POST"> -->
                        Tổng đơn :
                        <span class="text-danger font-weight-bold me-2"
                            ><b>{{ getToTalPrice(invoice) }} </b></span
                        >
                        <button
                            v-if="isShowBtnCancelOrder(invoice.status)"
                            @click="handleCancelOrder(invoice._id)"
                            name="huy-don-hang"
                            class="btn btn-danger float-right"
                        >
                            Huỷ
                        </button>
                        <!-- </form> -->
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="text-center m-0" v-if="isShowEmptyPurchase">Chưa có đơn hàng</p>
    </div>
</template>

<script>
import InvoiceService from '@/services/invoice.service';
import { useAuthStore } from '@/stores/auth.store';
export default {
    props: { state: { type: Number } },
    data() {
        return {
            invoices: [],
            isShowCanCelOrderSuccess: false,
            CountCanCelOrderSuccess: 0,
            isShowEmptyPurchase: false,
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
        async getAllInvoice() {
            try {
                const user = await this.getUser();
                let state = this.state ? this.state : '';

                this.invoices = await InvoiceService.getAllInvoice(state, user._id);
                // console.log(this.invoices);
                if (this.invoices.length == 0) {
                    this.isShowEmptyPurchase = true;
                } else {
                    this.isShowEmptyPurchase = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        getPrice(product) {
            return product.oldprice + ' ₫';
        },

        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },

        getPriceWithAmount(product) {
            const priceInt = product.oldprice.replace(/\./g, ''); //1.000.000 to 1000000

            const priceFinal = this.formatNumberWithDot(priceInt * product.ordernumber);
            return priceFinal;
        },
        getToTalPrice(invoice) {
            if (invoice) {
                const products_price = invoice.detail.reduce(
                    (total, item) => total + item.ordernumber * item.oldprice.replace(/\./g, ''),
                    0,
                );

                const total = products_price + 15000;
                return this.formatNumberWithDot(total);
            }
        },
        getIconAndStatus(status) {
            // <p class="mb-0 text-success"><i class="fa-solid fa-check"></i> Đơn hàng đang được xác nhận</p>
            const _status = parseInt(status);
            switch (_status) {
                case 0:
                case 1:
                    return '<p class="mb-0 text-success"><i class="fa-solid fa-check"></i> Đơn hàng đang được xác nhận</p>';
                case 2:
                    return '<p class="mb-0 text-success"><i class="fa-solid fa-truck"></i> Đang giao hàng</p>';
                case 3:
                    return '<p class="mb-0 text-success"><i class="fa-solid fa-truck"></i> Đơn hàng đã được giao thành công</p>';
                case 4:
                    return '<p class="mb-0 text-success"><i class="fa-solid fa-times"></i> Đơn hàng đã hủy</p>';
                default:
                    console.warn('not configured');
                    break;
            }
        },
        async handleCancelOrder(id) {
            try {
                let data = {
                    id: id,
                    status: null,
                };
                const result = await InvoiceService.cancelOrder(data);
                if (result) {
                    this.CountCanCelOrderSuccess++;
                    this.isShowCanCelOrderSuccess = true;
                    this.getAllInvoice();
                    // console.log(result);
                }
            } catch (error) {}
        },
        isShowBtnCancelOrder(status) {
            return parseInt(status) == 0 || parseInt(status) == 1;
        },
        hideCanCelOrderSuccess() {
            this.isShowCanCelOrderSuccess = false;
        },
    },
    computed: {
        // getTitle() {
        //     const state = parseInt(this.state);
        //     switch (state) {
        //         case 0:
        //             return 'chờ xác nhận';
        //         case 2:
        //             return 'đang giao hàng';
        //         case 3:
        //             return 'lịch sử mua hàng';
        //         default:
        //             return 'tất cả';
        //     }
        // },
        getCountCanCelOrderSuccess() {
            return this.CountCanCelOrderSuccess;
        },
    },
    watch: {
        state: {
            handler() {
                // Your logic for handling 'state'
                this.hideCanCelOrderSuccess();
                this.getAllInvoice();
            },
            deep: true,
        },
    },
    mounted() {
        this.getAllInvoice();
    },
};
</script>

<style lang="scss" scoped></style>
