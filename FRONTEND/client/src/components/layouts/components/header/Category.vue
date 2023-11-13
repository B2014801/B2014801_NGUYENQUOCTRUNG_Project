<template>
    <div>
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <router-link
                    class="nav-link"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/"
                >
                    Trang chủ
                </router-link>
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
    </div>
</template>

<script>
export default {
    props: {
        Categorys: { type: Array },
    },
    methods: {
        removeDiacriticsAndReplaceSpaces(inputString) {
            // Remove diacritics using a regular expression
            const withoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            // Replace spaces with hyphens
            const modifiedString = withoutDiacritics.replace(/\s+/g, '-');

            return modifiedString;
        },
    },
};
</script>

<style lang="scss" scoped>
.nav {
    margin: 0px 10px;
}
// @media all and (min-width: 992px) {
.navbar .nav-item:hover .dropdown-menu {
    display: block;
}
// }
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
