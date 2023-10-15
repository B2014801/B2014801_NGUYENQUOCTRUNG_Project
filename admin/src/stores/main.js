// store.js
import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        accessToken: null,
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
        },
    },
    getters: {
        accessToken: (state) => state.accessToken,
    },
});

export default store;
