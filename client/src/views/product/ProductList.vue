<template>
    <div class="row card-group mx-3 mt-2">
        <div class="col-sm-4 col-md-3 col-lg-3 col-6 mb-3" v-for="(product, index) in products">
            <div class="product-item">
                <a class="text-dark text-decoration-none">
                    <div class="card position-relative border-0">
                        <div class="selloff">
                            <h6 class="text-center m-1">5%</h6>
                        </div>
                        <img width="310" height="250" :src="images.logo" class="card-img-top" alt="#" />
                        <div class="card-body text-center">
                            <p class="mb-1">{{ product.name }}</p>
                            <h5 class="card-title"></h5>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import images from '@/assets/imgs';
export default {
    props: { products: { type: Array, default: [] } },
    data() {
        return {
            images: images,
        };
    },
};
</script>

<style lang="scss" scoped>
.selloff {
    border: 3px solid rgb(34, 101, 105);
    position: absolute;
    background-color: #fff;
    margin-top: 12%;
}
.product-item {
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.22);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.22);
}
</style>
