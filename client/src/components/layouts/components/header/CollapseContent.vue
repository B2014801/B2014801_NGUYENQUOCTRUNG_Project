<template>
    <div
        v-if="isCollapsed"
        class="collapse Content-collapse navbar-collapse navbar navbar-expand-lg py-1 bg-dark"
        id="navBarCollapse"
    >
        <div class="w-50">
            <!-- <Search /> -->
            <slot></slot>
            <div class="ms-2">
                <Category :Categorys="Categorys" />
            </div>
        </div>
    </div>
</template>

<script>
import Category from './Category.vue';
import Search from '@/components/search/Search.vue';
export default {
    props: {
        isCollapsed: { type: Boolean },
        Categorys: { type: Array },
    },
    components: {
        Category,
        Search,
    },
};
</script>

<style lang="scss" scoped>
.Content-collapse {
    display: block;
}
</style>
