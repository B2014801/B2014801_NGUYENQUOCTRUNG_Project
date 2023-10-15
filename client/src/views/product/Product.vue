<template>
    <div class="mt-3 mb-4">
        <div class="text-center">
            <h3 class="text-uppercase">hieusanpham</h3>
        </div>
        <form action="" method="POST" id="formsapxepsanpham">
            <div class="float-right mb-2"></div>
        </form>
    </div>
    <ProductList :products="products" />
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import PetshopService from '@/services/petshop.service';
export default {
    data() {
        return {
            products: [],
            images: images,
        };
    },
    components: {
        ProductList,
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await PetshopService.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllProduct();
    },
};
</script>

<style lang="scss" scoped></style>
