import { createWebHistory, createRouter } from 'vue-router';
import { Home, About, Product, Cart, NotFound } from '@/views/';
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
