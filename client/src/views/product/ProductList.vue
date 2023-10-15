<template>
    <div class="row card-group mx-3 mt-2">
        <div class="col-sm-4 col-md-3 col-lg-3 col-6 mb-3" v-for="(product, index) in paginatedProducts">
            <div class="product-item">
                <router-link :to="getRouter(product)" class="text-dark text-decoration-none">
                    <div class="card position-relative border-0">
                        <div v-if="isDiscout(index)" class="selloff">
                            <h6 class="text-center m-1">-{{ product.discount }}%</h6>
                        </div>
                        <img :style="{ height: responseImg }" :src="product.img" class="card-img-top" alt="#" />
                        <div class="card-body text-center p-1">
                            <div v-if="!CategoryName">
                                <p class="mb-1">{{ product.name }}</p>
                                <span class="card-title" v-if="isDiscout(index)">
                                    <del class="discountDel">{{ getProductPrice(index) }}</del
                                    ><bdi class="text-danger fw-bold">{{ getProductAfterDisCount(index) }}</bdi>
                                </span>
                                <span v-else class="card-title">
                                    <b>{{ getProductPrice(index) }}</b>
                                </span>
                            </div>
                            <div v-else>
                                <h5 class="brand-title my-auto">{{ product.name }}</h5>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div class="product-list-devide-page" v-if="totalPages >= 2">
        <button @click="previousPage" :disabled="currentPage === 1"><i class="fa-solid fa-chevron-left"></i></button>
        <button
            @click="targetPage(index)"
            v-for="(page, index) in totalPages"
            :class="{ active: index + 1 == currentPage }"
        >
            {{ index + 1 }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
</template>

<script>
// import images from '@/assets/imgs';
import ProductService from '@/services/petshop.service';

export default {
    props: { products: { type: Array, default: [] }, CategoryName: { type: String } },
    data() {
        return {
            images: '',
            screenWidth: 0,
            itemsPerPage: 2,
            currentPage: 1,
            // isSmallScreen: window.innerWidth <= 768,
        };
    },
    methods: {
        onScreenResize() {
            window.addEventListener('resize', () => {
                this.updateScreenWidth();
            });
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        getProductPrice(index) {
            const priceInt = this.products[index].price + ' ₫';
            return priceInt;
        },
        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getProductAfterDisCount(index) {
            const PriceInt = this.products[index].price.replace(/\./g, '');
            const AfterDiscount = PriceInt - (PriceInt * this.products[index].discount) / 100;
            return this.formatNumberWithDot(AfterDiscount);
        },
        isDiscout(index) {
            return this.products[index].discount > 0;
        },
        removeDiacriticsAndReplaceSpaces(inputString) {
            // Remove diacritics using a regular expression
            const withoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            // Replace spaces with hyphens
            const modifiedString = withoutDiacritics.replace(/\s+/g, '-');

            return modifiedString;
        },
        getRouter(product) {
            let router = {};
            if (this.CategoryName)
                router = {
                    name: 'product',
                    params: {
                        id: product._id,
                        BrandName: this.removeDiacriticsAndReplaceSpaces(product.name),
                        CategoryName: this.CategoryName,
                    },
                };
            else {
                router = {
                    name: 'productdetail',
                    params: {
                        ProductName: this.removeDiacriticsAndReplaceSpaces(product.name),
                        id: product._id,
                    },
                };
            }
            return router;
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        targetPage(index) {
            this.currentPage = index + 1;
        },
    },
    computed: {
        responseImg() {
            return this.screenWidth <= 768 ? '100px' : '250px';
        },

        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },
        // Slice the products array based on the current page and items per page
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.products.slice(startIndex, endIndex);
        },
    },

    mounted() {
        this.updateScreenWidth();
        this.onScreenResize();
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style lang="scss" scoped>
.card-title {
    font-size: 14px;
}
.discountDel {
    opacity: 0.7;
    margin-right: 6px;
}
.product-list-devide-page {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    button {
        font-size: 16px;
        font-weight: 500;
        border-radius: 99px;
        min-width: 35px;
        min-height: 35px;
        margin: 0 2px;

        &:not(:disabled):hover {
            background-color: rgb(34, 101, 105);
            border: none;
            color: #fff;
        }
    }
    .active {
        background-color: rgb(34, 101, 105);
        border: none;
        color: #fff;
    }
}
.brand-title {
    text-transform: uppercase;
    font-size: 16px;
}
</style>
