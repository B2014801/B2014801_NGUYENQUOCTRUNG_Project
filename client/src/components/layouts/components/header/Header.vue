<template>
    <nav class="navbar navbar-expand-lg p-1">
        <div class="container-fluid position-relative p-0 mx-2">
            <button class="navbar-toggler" type="button" @click="toggleCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <router-link to="/" class="mr-2">
                <img :src="images.logo" class="" alt="" width="130" height="70" />
            </router-link>
            <div class="collapse navbar-collapse justify-content-between mr-3">
                <Category :Categorys="Categorys" />
                <div class="header-search">
                    <Search
                        @value="getProductWithName"
                        :products="products"
                        :LoadingSearch="LoadingSearch"
                        :isEmptyProduct="isEmptyProduct"
                        :isSearch="isSearch"
                    ></Search>
                </div>
            </div>

            <div class="d-inline">
                <router-link to="/cart" class="text-white"><i class="fa-solid fa-cart-shopping mx-3"></i></router-link>

                <span v-if="!isUserLogin">
                    <router-link to="/login" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user"></i> |
                    </router-link>
                    <router-link to="/register" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user-plus"></i
                    ></router-link>
                </span>
                <span v-else>
                    <router-link to="/user/purchase">
                        <i class="fa-solid fa-user mr-3 ml-2"></i>
                    </router-link>
                </span>
            </div>
        </div>
    </nav>
    <CollapseContent :isCollapsed="isCollapsed" :Categorys="Categorys">
        <Search
            @value="getProductWithName"
            :products="products"
            :LoadingSearch="LoadingSearch"
            :isEmptyProduct="isEmptyProduct"
            :isSearch="isSearch"
        ></Search>
    </CollapseContent>
</template>
<script>
import { useAuthStore } from '@/stores/auth.store';
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';

import PetshopService from '@/services/petshop.service';
// import ButtonCollapse from '@/components/button/ButtonCollapse.vue';
export default {
    data() {
        return {
            images: images,
            isCollapsed: false,

            products: [],
            LoadingSearch: false,
            isEmptyProduct: false,
            isSearch: null,
        };
    },
    components: {
        Search,
        CollapseContent,
        Category,
        // ButtonCollapse,
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        async getProductWithName(name) {
            try {
                this.isEmptyProduct = false;
                if (!name.startsWith('?') && name.trim() != '') {
                    this.LoadingSearch = true;
                    let documents = null;
                    setTimeout(async () => {
                        documents = await PetshopService.findByName(name);
                        if (documents.length != 0) {
                            this.products = documents;
                            this.isEmptyProduct = false;
                        } else {
                            this.products = [];
                            this.isEmptyProduct = true;
                        }
                        this.isSearch = true;
                        this.LoadingSearch = false;
                    }, 1500);
                } else {
                    this.LoadingSearch = false;
                    this.isEmptyProduct = true;
                }
            } catch (error) {}
        },
    },
    computed: {
        isUserLogin() {
            try {
                const auth = useAuthStore();
                auth.loadAuthState();
                return auth.isUserLoggedIn;
            } catch (error) {
                console.log(error);
            }
        },
    },

    mounted() {},
};
</script>
<style scoped lang="scss">
.header-search {
    display: flex;
    align-items: center;
}
</style>
