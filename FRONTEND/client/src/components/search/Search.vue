<template>
    <div class="search">
        <Form @submit="goToSearchResult" class="form-inline m-2 bg-white border-0 rounded p-1">
            <div class="input-group-form">
                <Field
                    class="search-header border-0"
                    type="search"
                    placeholder="Tìm kiếm..."
                    style="outline: none; width: 90%"
                    name="search_query"
                    autocomplete="off"
                    v-model="KeySearch"
                    @input="sendInputValue"
                    @focus="showSearchResults = true"
                />
                <ErrorMessage />
                <button v-if="!LoadingSearch" v-tippy="'Hello!'" type="submit" class="border-0 bg-white">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <HalfCircleSpinner v-else class="mx-auto" :animation-duration="1200" :size="20" color="#4f0b14" />
            </div>
        </Form>
        <div class="search-result-container-wrapper" v-if="isSearch">
            <div v-show="showSearchResults && isSearch && KeySearch.trim() != ''" class="search-result-container">
                <div
                    v-for="(product, index) in products"
                    class="search-result-item"
                    :style="{ borderBottom: index != products.length - 1 ? '1px solid #f1f1f1' : 'none' }"
                >
                    <router-link
                        class="text-dark"
                        :to="`/product/` + removeDiacriticsAndReplaceSpaces(product.name) + '/' + product._id"
                    >
                        <img data-v-84a960a5="" :src="product.img" />
                        <div>{{ product.name }}</div>
                        <span>{{ product.price }} ₫</span>
                    </router-link>
                </div>
                <div v-if="isEmptyProduct || products.length == 0" class="text-center">Không có sản phẩm nào</div>
            </div>
        </div>
    </div>
</template>

<script>
import { IntersectingCirclesSpinner, HalfCircleSpinner } from 'epic-spinners';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useTippy } from 'vue-tippy';
import { ref } from 'vue';
import { directive } from 'vue-tippy';
const btn = ref();
useTippy(btn, {
    content: 'trung',
    arrow: true,
});
export default {
    props: {
        products: { type: Array },
        LoadingSearch: { type: Boolean, default: false },
        isEmptyProduct: { type: Boolean, default: false },
        isSearch: { type: Boolean, default: null },
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        HalfCircleSpinner,
    },
    data() {
        return {
            KeySearch: '',
            showSearchResults: true,
        };
    },
    methods: {
        // async findByName() {
        //     const result = await PetshopService.findByName(this.KeySearch);
        //     if (result) {
        //         console.log(result);
        //     }
        // },
        goToSearchResult() {
            if (this.KeySearch.trim() != '') {
                this.$router.push({
                    name: 'search',
                    query: {
                        keySearch: this.KeySearch, // 'keySearch' is the query parameter name
                    },
                });
            }
        },
        sendInputValue() {
            this.$emit('value', this.KeySearch);
        },
        toggleSearchResults() {
            this.showSearchResults = !this.showSearchResults;
        },
        handleClickOutside(event) {
            const container = this.$el.querySelector('.search-result-container');
            const inputField = this.$el.querySelector('.search-header');
            if (container && !container.contains(event.target) && inputField !== event.target) {
                this.showSearchResults = false;
            }
        },
        removeDiacriticsAndReplaceSpaces(inputString) {
            // Remove diacritics using a regular expression
            const withoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            // Replace spaces with hyphens
            const modifiedString = withoutDiacritics.replace(/\s+/g, '-');

            return modifiedString;
        },
    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style lang="scss" scoped>
.input-group {
    flex-wrap: nowrap;
}
.search {
    .input-group-form {
        display: flex;
        align-items: center !important;
    }
    position: relative;
    .search-result-container-wrapper {
        position: absolute;
        top: 86%;
        right: 0;
        bottom: 0;

        z-index: 1;
        .search-result-container {
            padding: 10px 0;
            border-radius: 10px;
            max-height: 80vh;
            background-color: #fff;
            // height: 400px;
            min-width: 240px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
            overflow-y: scroll;
            .search-result-item {
                &:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }
                padding: 10px;
                background-color: #fff;
                a {
                    display: flex;
                    align-items: center;
                }
                div {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin: 0 8px;
                }
                img {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 99px;
                }
            }
        }
    }
}
</style>
