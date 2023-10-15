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
                <!-- <Search></Search> -->
            </div>

            <div class="d-inline text-white">
                <!-- '<a href="'.(isset($_SESSION['tendangnhapadmin']) ? 'admincp' : 'index.php?quanly=taikhoan').'">
                    <i class="fa-solid fa-user mr-3 ml-2"></i
                ></a> -->
                <!-- <a
                    class="text-decoration-none text-white"
                    style="position: absolute; top: 0; right: 0"
                    data-toggle="modal"
                    data-target="#modal-logout"
                    ><i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>Thoát</a
                > -->
                <!-- <div id="modal-logout" class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content border">
                            <h4 class="text-center text-warning">Bạn có chắc muốn thoát không</h4>
                            <div class="display-inline mx-auto">
                                <a href="index.php?action=dangxuat" role="button" class="btn btn-danger mr-2">Có</a>
                                <a role="button" class="btn btn-danger" data-dismiss="modal">Không</a>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- <router-link to="/login" class="text-white text-decoration-none"
                    ><i class="fa-solid fa-user"></i> |
                </router-link>
                <router-link to="/register" class="text-white text-decoration-none"
                    ><i class="fa-solid fa-user-plus"></i
                ></router-link> -->
            </div>
        </div>
    </nav>
    <CollapseContent v-if="showCategory" :isCollapsed="isCollapsed" />
</template>
<script>
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';
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
