<template>
    <nav class="navbar navbar-expand-lg p-1">
        <div class="container-fluid position-relative p-0">
            <button class="navbar-toggler" type="button" @click="toggleCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link to="/" class="mr-2">
                <img :src="images.logo" class="" alt="" width="130" height="70" />
            </router-link>
            <div class="collapse navbar-collapse justify-content-between mr-3">
                <Category v-if="showCategory" />
                <button v-if="showCategory" @click="handleLogout" class="btn btn-light">Đăng xuất</button>
            </div>

            <div class="d-inline text-white"></div>
        </div>
    </nav>
    <CollapseContent v-if="showCategory" :isCollapsed="isCollapsed" />
</template>
<script>
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';
import { useAuthStore } from '@/stores/auth.store';
// import ButtonCollapse from '@/components/button/ButtonCollapse.vue';
export default {
    props: {
        showCategory: { type: Boolean },
    },
    data() {
        return {
            images: images,
            isCollapsed: false,
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
        async handleLogout() {
            let auth = useAuthStore();
            await auth.logout();
            this.$router.push({ name: 'login' });
        },
    },
};
</script>
<style>
.nav {
    margin: 0px 10px;
}
/* @media all and (min-width: 992px) { */
.navbar .nav-item:hover .dropdown-menu {
    display: block;
}
/* } */
.nav-link,
.dropdown-item,
.nav-link-collapse {
    color: #fff !important;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
}
.dropdown-menu {
    background-color: rgb(148, 233, 193);
    padding: 0;
}
.dropdown-item:hover {
    background-color: rgb(34, 101, 105) !important;
}
.dropdown-item {
    padding: 8px;
}
.dropdown-item:focus {
    background-color: rgb(156, 228, 231) !important;
}
</style>
