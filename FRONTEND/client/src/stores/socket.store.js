import { defineStore } from 'pinia';
import { websocketPlugin } from '@/socket/socket';
const socketStore = defineStore('socket', {
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [websocketPlugin],
});

export default socketStore;
