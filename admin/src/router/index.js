import { createWebHistory, createRouter } from 'vue-router';
import { NotFound, Login, Product, AddProduct, EditProduct, Order } from '@/views/';

import { useAuthStore } from '@/stores/auth.store';
const routes = [
    {
        path: '/product',

        component: Product,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            publicPage: true,
            layout: 'notCategoryLayout',
        },
        props: true,
    },

    {
        path: '/',
        name: 'product',
        component: Product,
    },
    {
        path: '/product/add',
        name: 'product.add',
        component: AddProduct,
    },
    {
        path: '/product/:id',
        name: 'product.edit',
        component: EditProduct,
        props: true,
    },

    {
        path: '/order',
        name: 'order',
        component: Order,
        // props: true,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, _from) => {
    const authRequired = !to.meta.publicPage; // have one equal false to interrupt loop (show comp)
    const auth = useAuthStore();
    await auth.loadAuthState();

    if (authRequired && !auth.user) {
        const query = to.fullPath === '/' ? {} : { redirect: to.fullPath };
        return {
            name: 'login',
            query,
        };
    }
});
export default router;
