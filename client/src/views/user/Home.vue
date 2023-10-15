<template>
    <div class="User-Home-Container">
        <div class="container">
            <div>
                <ul class="User-Home-Nav">
                    <li
                        v-for="(category, index) in list_user_category"
                        @click="setActiveItem(index)"
                        :class="{ 'active-category': activeItemIndex == index }"
                    >
                        <router-link :to="category.link">{{ category.title }}</router-link>
                    </li>
                </ul>
            </div>
            <div><router-view></router-view></div>
        </div>
    </div>
</template>

<script>
const list_user_category = [
    {
        title: 'TẤT CẢ',
        link: { name: 'state' },
    },
    {
        title: 'CHỜ XÁC NHẬN',
        link: { name: 'state', query: { state: 0 } },
    },
    {
        title: 'ĐANG GIAO HÀNG',
        link: { name: 'state', query: { state: 2 } },
    },
    {
        title: 'HOÀN THÀNH',
        link: { name: 'state', query: { state: 3 } },
    },
    {
        title: 'ĐÃ HỦY',
        link: { name: 'state', query: { state: 4 } },
    },
];
export default {
    data() {
        return { list_user_category, activeItemIndex: 0 };
    },
    methods: {
        setActiveItem(index) {
            this.activeItemIndex = index;
        },
    },
    created() {
        document.title = 'User';
    },
};
</script>

<style lang="scss" scoped>
.User-Home-Container {
    background: #f5f5f5;
    padding: 10px 0;
}
.User-Home-Nav {
    display: flex;
    justify-content: space-between;

    background-color: #fff;
    padding: 0;
    li {
        text-align: center;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0%;
        // background-color: aqua;
        padding: 16px 0;
        border-bottom: 2px solid rgba(0, 0, 0, 0.09);

        a:hover {
            color: #ee4d2d;
        }
        a {
            // font-size: 2vh;
            font-weight: 400;
            color: #000;
            padding: 16px 0;
        }
    }
    .active-category {
        border-color: #ee4d2d;
    }
}
</style>
