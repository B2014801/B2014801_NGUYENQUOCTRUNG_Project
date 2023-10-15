<template>
    <div>
        <UpdateProductFrom
            @submit:create="create"
            :Add="add"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :CountAddProduct="CountAddProduct"
        />
    </div>
</template>

<script>
import UpdateProductFrom from '@/components/form/UpdateProductFrom.vue';
import ProductService from '@/services/product.service';

export default {
    components: { UpdateProductFrom },
    data() {
        return {
            add: true,
            isShowUpdateSuccess: false,
            CountAddProduct: 0,
        };
    },
    methods: {
        async create(data) {
            try {
                const result = await ProductService.add(data);
                if (result) {
                    // console.log(result);
                    this.isShowUpdateSuccess = true;
                    this.CountAddProduct++;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
