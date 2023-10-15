<template>
    <nav class="navbar navbar-expand-lg p-1">
        <div class="container-fluid position-relative p-0">
            <button
                class="navbar-toggler"
                type="button"
                data-pos="left"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link to="/" class="mr-2">
                <img :src="images.logo" class="" alt="" width="130" height="70" />
            </router-link>
            <div class="collapse navbar-collapse justify-content-between mr-3">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <router-link
                            class="nav-link dropdown-toggle"
                            href="index.php"
                            id="navbarDropdownMenuLink"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            to="/"
                        >
                            Trang chủ
                        </router-link>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link to="/about" class="dropdown-item">Giới thiệu</router-link>
                            <router-link to="/news" class="dropdown-item">Tin tức</router-link>
                            <router-link to="/contact" class="dropdown-item">Liên hệ</router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link
                            class="nav-link"
                            href="index.php"
                            id="navbarDropdownMenuLink"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            to="/product"
                        >
                            Sản phẩm
                        </router-link>
                    </li>
                </ul>
                <Search></Search>
            </div>

            <div class="d-inline text-white">
                <router-link to="/cart" class="text-white mr-3"
                    ><i class="fa-solid fa-cart-shopping mx-3"></i
                ></router-link>

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
                <a href="index.php?quanly=dangnhap" class="text-white text-decoration-none"
                    ><i class="fa-solid fa-user"></i> |
                </a>
                <a href="index.php?quanly=dangky" class="text-white text-decoration-none"
                    ><i class="fa-solid fa-user-plus"></i
                ></a>
            </div>
        </div>
    </nav>

    <div class="collapse navbar-collapse navbar navbar-expand-lg bg-dark py-1" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <form
                action="index.php?quanly=timkiem"
                class="form-inline my-2 my-lg-0 bg-white border-0 rounded p-1"
                method="GET"
            >
                <div class="input-group">
                    <input
                        class="border-0"
                        type="search"
                        placeholder="Tìm kiếm..."
                        aria-label="Search"
                        style="outline: none; width: 90%"
                        name="search_query"
                    />
                    <button class="border-0 bg-white" type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>
            <li class="nav-item dropdown">
                <p class="nav-link-collapse text-decoration-none" href="index.php">Trang chủss</p>
                <i
                    class="fa-solid fa-chevron-down text-white float-right"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="index.php?quanly=gioithieu">Giới thiệu</a>
                    <a class="dropdown-item" href="index.php?quanly=tintuc">Tin tức</a>
                    <a class="dropdown-item" href="index.php?quanly=lienhe">Liên hệ</a>
                </div>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link-collapse text-decoration-none" href=""> </a>
                <i
                    class="fa-solid fa-chevron-down text-white float-right"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href=""> </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
export default {
    data() {
        return {
            images: images,
        };
    },
    components: {
        Search,
    },
};
</script>
<style>
.nav {
    margin: 0px 10px;
}
@media all and (min-width: 992px) {
    .navbar .nav-item:hover .dropdown-menu {
        display: block;
    }
}
.nav-link,
.dropdown-item,
.nav-link-collapse,
.dangxuat {
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
</style>
