// store.js
import { defineStore } from 'pinia';

export const cartStore = defineStore('cart', {
    state() {
        return {
            amount: 0,
        };
    },
    //like computed
    getters: {
        getAmount() {
            return this.amount;
        },
    },
    //like method
    actions: {
        setAmount(amount) {
            this.amount = amount;
        },
        plusAmount() {
            this.amount++;
        },
        minusAmount() {
            this.amount--;
        },
    },
});
