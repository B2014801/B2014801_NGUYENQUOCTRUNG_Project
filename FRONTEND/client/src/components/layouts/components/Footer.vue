<template>
    <footer>
        <p class="text-center text-white">© Copyright by student of ctu</p>
        <div class="text-center">
            <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=100027472571183"
                ><i class="fa-brands fa-facebook"></i
            ></a>
            <a href="#" @click="showModelFooter"><i class="fa-regular fa-message"></i></a>

            <a
                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.029939,105.7684266,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN"
                ><i class="fa-solid fa-location-pin"></i
            ></a>
        </div>
        <div v-if="isShowModelFooter">
            <div class="modal-footer">
                <div>
                    <button data-dismiss="modal" @click="showModelFooter">&times;</button>
                    <img :src="img.zalo" class="w-100" alt="" />
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import imgs from '@/assets/imgs';
export default {
    data() {
        return {
            isShowModelFooter: false,
            img: imgs,
        };
    },
    methods: {
        showModelFooter() {
            this.isShowModelFooter = !this.isShowModelFooter;
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-footer {
    display: flex;
    justify-content: center; /* Horizontally center the content */
    align-items: flex-end; /* Align content to the bottom */
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    button {
        width: 100%;
        border: 0;
        background-color: rgb(148, 233, 193);
    }
}
footer a i {
    margin: 0 6px;
}
footer a {
    color: #fff;
    font-size: 20px;
}
footer {
    padding: 20px 0;
}
</style>
