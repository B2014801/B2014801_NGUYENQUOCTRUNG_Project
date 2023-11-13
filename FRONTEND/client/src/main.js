import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import Vuex from 'vuex';

import './assets/main.css';
import './views/assets/main.css';
import './assets/css/global.scss';
import App from './App.vue';
import router from './router';

createApp(App).use(Vuex);

createApp(App).use(VueTippy, {
    defaultProps: { placement: 'bottom' },
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
});
const vm = createApp(App)
    .use(createPinia())

    .use(router)
    .mount('#app');

export default vm;
