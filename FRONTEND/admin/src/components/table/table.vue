<template>
    <div class="mt-4">
        <div class="searchBar">
            <Search :classProps="classProps" @search="onSearch" />
        </div>
        <table id="tableComponent" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th v-for="(field, index) in fields" :key="field" @click="sortTable(fieldsMap[index])" class="p-1">
                        {{ field }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedAndFilteredData" :key="item">
                    <td v-for="(field, index) in fieldsMap" :key="field">
                        <slot name="orderProduct" :field="field" :item="item"></slot>

                        <div v-if="field == 'edit'">
                            <div class="update-icon">
                                <router-link :to="'/' + categoryname + '/' + item.id">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <i @click="() => deleteProduct(item.id)" class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div v-else>
                            <div v-if="field == 'img'">
                                <img :src="item[field]" alt="" height="60" width="100" />
                            </div>
                            <div v-else>
                                <div v-if="field != 'Product' && field != 'Address'">
                                    {{ item[field] }}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { sortBy, orderBy } from 'lodash';

import Search from '@/components/search/search.vue';

export default {
    name: 'TableComponent',
    props: {
        Data: {
            type: Array,
        },
        fields: {
            type: Array,
        },
        isOrder: {
            type: Boolean,
        },
        fieldsMap: {
            type: Array,
        },
        categoryname: {
            type: String,
        },
    },
    components: {
        Search,
    },
    data() {
        return {
            // Create a copy of Data for sorting
            sortedData: this.Data,
            classProps: 'w-50 mx-auto  border m-1 p-2',
            searchQuery: '',
            sortField: '', // The currently selected sorting field
            sortDirection: 'desc',
        };
    },
    computed: {
        filteredData() {
            if (typeof this.searchQuery === 'string') {
                const query = this.searchQuery.toLowerCase().trim();
                return this.Data.filter((item) => {
                    // Initialize a flag to check if the query matches any field
                    let match = false;
                    // Loop through all fields in the item
                    for (const field of this.fieldsMap) {
                        let value = null;
                        if (field == 'Product') {
                            // check for all name in product
                            for (const product of item[field]) {
                                value = product.name;
                                if (typeof value === 'string' && value.toLowerCase().includes(query)) {
                                    match = true;
                                    break; // If a match is found in any field, break out of the loop
                                }
                            }
                        }
                        if (field == 'Address') {
                            // check for all name in product
                            value = item[field].phone + item[field].address;
                        } else {
                            value = item[field];
                        }

                        // Check if the value of the field contains the query
                        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
                            match = true;
                            break; // If a match is found in any field, break out of the loop
                        }
                    }

                    // If a match is found in any field, include the item in the filtered data
                    return match;
                });
            } else {
                // If searchQuery is not a string, return the original data
                return this.Data;
            }
        },
        sortedAndFilteredData() {
            // First, apply filtering to the data
            const filteredData = this.filteredData;

            // Then, apply sorting to the filtered data
            if (this.sortField) {
                return orderBy(filteredData, [this.sortField], [this.sortDirection]);
            } else {
                // If no sorting field is selected, return the filtered data as is
                return filteredData;
            }
        },
    },

    methods: {
        onSearch(query) {
            // Update the searchQuery when the search event is emitted by the Search component
            this.searchQuery = query;
        },
        async deleteProduct(id) {
            this.$emit('deleteProduct', id);
        },

        handleChangeStatePurchase(id, status) {
            this.$emit('handleChangeStatePurchase', id, status);
        },
        sortTable(field) {
            if (field === this.sortField) {
                // Toggle sorting direction if the same field is clicked again
                this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
            } else {
                // If a new field is clicked, set it as the sorting field and reset direction to 'asc'
                this.sortField = field;
                this.sortDirection = 'desc';
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
