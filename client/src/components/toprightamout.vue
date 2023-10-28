<template>
    <div v-if="getAmount > 0" class="top-right-amount">{{ getAmount }}</div>
    <slot class="container-have-top-right-amount"> </slot>
</template>

<script>
import { cartStore } from '@/stores/main';
export default {
    computed: {
        getAmount() {
            let CartStore = cartStore();
            return CartStore.getAmount;
        },
    },
};
</script>

<style lang="scss" scoped>
.top-right-amount {
    position: absolute;
    top: 12px;
    right: 20px;
    padding: 0 5px;
    border-radius: 999px;
    font-size: 12px;
    color: rgb(28, 156, 165);
    background-color: #fff;
}
.container-have-top-right-amount {
    position: relative;
}
</style>
