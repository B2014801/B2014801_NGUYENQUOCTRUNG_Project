<template>
    <section>
        <carousel :items-to-show="1" :autoplay="2000" :wrapAround="true" :transition="1500">
            <!-- <slide v-for="slide in 3" :key="slide"> -->
            <slide key="slide1"><img class="w-100" :src="img.home1" alt="" /></slide>
            <slide key="slide2"><img class="w-100" :src="img.home2" alt="" /></slide>
            <slide key="slide3"><img class="w-100" :src="img.home3" alt="" /></slide>
            <!-- </slide> -->

            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </section>
    <hr />
    <section class="mx-3">
        <div>
            <h3 class="text-center">THÚ CƯNG ĐANG BÁN</h3>
            <ProductList :products="products" />
        </div>
    </section>
    <HR></HR>
    <section class="mx-3">
        <div>
            <h3 class="text-center">THÚ CƯNG MỚI NHẤT</h3>
            <ProductList :products="products" />
        </div>
        <hr />
    </section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import ProductList from '@/views/product/ProductList.vue';
import petshopService from '@/services/petshop.service';
import img from '@/assets/imgs';
export default {
    components: {
        ProductList,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            products: [],
            img,
        };
    },
    methods: {
        async getProductHomePage() {
            try {
                this.products = await petshopService.getAllProduct();
            } catch (error) {}
        },
        resetCarousel() {
            // Reset the carousel back to the first slide when it reaches the end
            this.$refs.carousel.goTo(0);
        },
    },
    mounted() {
        this.getProductHomePage();
        document.title = 'Home';
    },
};
</script>

<style lang="scss" scoped></style>
