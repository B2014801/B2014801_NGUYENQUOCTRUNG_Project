<template>
    <div v-if="address.length == 0">
        <intersecting-circles-spinner class="mx-auto" :animation-duration="1200" :size="50" color="#ff1d5e" />
    </div>
    <div class="form-group font-weight-bold mt-2" v-if="address.length != 0">
        <label>Địa chỉ <strong class="text-danger">(*)</strong> </label>
        <div class="input-group border register-address-selection">
            <select v-model="selectedTown" @change="onTownChange()">
                <option name="" :id="'tinh' + index" :value="item.name" v-for="(item, index) in address">
                    {{ item.name }}
                </option>
            </select>
            <select v-model="selectedDistrict" @change="onDistrictChange()">
                <option name="" :id="'tinh' + index" :value="item.name" v-for="(item, index) in selectedTownDistricts">
                    {{ item.name }}
                </option>
            </select>
            <select v-model="selectedWard">
                <option name="" :id="'tinh' + index" :value="item.name" v-for="(item, index) in selectedDistrictWards">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <span v-show="isShowNotChosenAddressWhenSubmit" name="address" class="text-danger">Vui lòng chọn địa chỉ</span>
    </div>
</template>

<script>
import { array } from 'yup';
import VietNamAddress from '@/services/another_service/vietnamaddress.service';
import { IntersectingCirclesSpinner, HalfCircleSpinner } from 'epic-spinners';
export default {
    props: { isClickSubmit: { type: Boolean }, user_address: { type: Object } },
    components: {
        IntersectingCirclesSpinner,
    },
    data() {
        return {
            selectedTown: '',
            selectedDistrict: '',
            selectedWard: '',
            address: [],
        };
    },
    methods: {
        onTownChange() {
            this.selectedDistrict = ''; // Reset district and ward when town changes
            this.selectedWard = '';
        },
        onDistrictChange() {
            this.selectedWard = ''; // Reset ward when district changes
        },
        async getVietNamAddress() {
            try {
                this.address = await VietNamAddress.getVietNamAddress();
            } catch (error) {
                console.log(error);
            }
        },
        getAddressFromUser() {
            if (this.user_address) {
                let address = this.user_address.split(',');
                this.selectedTown = address[2].trim();
                this.selectedDistrict = address[1].trim();
                this.selectedWard = address[0].trim();
            }
        },
        emitAddressData() {
            if (this.isChosenAddress) {
                const data = {
                    selectedTown: this.selectedTown,
                    selectedDistrict: this.selectedDistrict,
                    selectedWard: this.selectedWard,
                };
                this.$emit('address:data', data, this.isChosenAddress);
            }
        },
    },
    computed: {
        selectedTownDistricts() {
            if (this.selectedTown) {
                // Find the selected town and return its districts
                const selectedTownData = this.address.find((item) => item.name === this.selectedTown);
                return selectedTownData ? selectedTownData.districts : [];
            }
            return [];
        },
        selectedDistrictWards() {
            if (this.selectedDistrict) {
                // Find the selected district and return its wards
                const selectedDistrictData = this.selectedTownDistricts.find(
                    (item) => item.name === this.selectedDistrict,
                );
                return selectedDistrictData ? selectedDistrictData.wards : [];
            }
            return [];
        },
        isChosenAddress() {
            return this.selectedTown != '' && this.selectedDistrict != '' && this.selectedWard != '';
        },
        isShowNotChosenAddressWhenSubmit() {
            return !this.isChosenAddress && this.isClickSubmit;
        },
    },
    watch: {
        selectedWard(newvl) {
            this.emitAddressData();
            this.$emit('isChosenAddress', this.isChosenAddress);
        },
        selectedDistrict() {
            this.$emit('isChosenAddress', this.isChosenAddress);
        },
        selectedTown() {
            this.$emit('isChosenAddress', this.isChosenAddress);
        },
    },
    mounted() {
        this.getVietNamAddress();
        this.getAddressFromUser();
        this.emitAddressData();
    },
};
</script>

<style lang="scss" scoped>
.register-address-selection {
    display: flex;
    justify-content: center;
    select {
        margin: 4px 0;
        width: 170px;
        max-height: 150px;
    }
}
</style>
