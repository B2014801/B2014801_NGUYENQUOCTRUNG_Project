import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue';

import './assets/main.css';
import './assets/css/global.scss';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
