import { createWebHistory, createRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import {
    Home,
    Product,
    Cart,
    NotFound,
    Login,
    CreateAccount,
    ProductDetail,
    CheckOut,
    Search,
    UserHome,
    State,
} from '@/views/';
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        props: (route) => ({ keySearch: route.query.keySearch }),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
    },

    {
        path: '/product',
        name: 'product',
        component: Product,
        props: true,
    },
    {
        path: '/product/:ProductName/:id',
        name: 'productdetail',
        component: () => ProductDetail,
        props: true,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: CreateAccount,
    },

    {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut,
    },

    {
        path: '/user/',
        name: 'user',
        component: UserHome,
        children: [
            {
                path: '/user/purchase',
                name: 'state',
                component: State,
                props: (route) => ({ state: route.query.state }),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach(async (to, from, next) => {
//     if (to.meta.shouldFetch) {
//         // Fetch the data and assign it to to.meta.data
//         to.meta.data = await fetchSomething();
//     }

//     // Continue with the navigation
//     next();
// });
export default router;
