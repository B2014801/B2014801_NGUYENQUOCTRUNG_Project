import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import Vuex from 'vuex';

import './assets/main.css';
import './views/assets/main.scss';
import './assets/css/global.scss';
import App from './App.vue';
import router from './router';
// import store from './stores/main';

createApp(App).use(Vuex);
// createApp(App).use(VueCookies);
// createApp(App).use(createPinia());

createApp(App).use(VueTippy, {
    defaultProps: { placement: 'bottom' },
});
const vm = createApp(App).use(createPinia()).use(router).mount('#app');
export default vm;
