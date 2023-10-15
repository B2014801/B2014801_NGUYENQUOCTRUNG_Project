<template>
    <div>
        <Form @submit="sendMessage">
            <div class="card-comment">
                <div class="d-flex">
                    <div>
                        <!-- <img src=> -->
                    </div>
                    <div class="col-10">
                        <div class="comment-box ml-2">
                            <h4>Thêm bình luận</h4>
                            <div class="rating">
                                <input type="radio" name="rating" value="5" id="5" v-model="comment.star" /><label
                                    for="5"
                                    >☆</label
                                >
                                <input type="radio" name="rating" value="4" id="4" v-model="comment.star" /><label
                                    for="4"
                                    >☆</label
                                >
                                <input type="radio" name="rating" value="3" id="3" v-model="comment.star" /><label
                                    for="3"
                                    >☆</label
                                >
                                <input type="radio" name="rating" value="2" id="2" v-model="comment.star" /><label
                                    for="2"
                                    >☆</label
                                >
                                <input type="radio" name="rating" value="1" id="1" v-model="comment.star" /><label
                                    for="1"
                                    >☆</label
                                >
                            </div>
                            <div class="comment-area">
                                <textarea
                                    class="form-control"
                                    placeholder="Bạn cảm thấy sản phẩm này thế nào?"
                                    rows="3"
                                    v-model="comment.content"
                                ></textarea>
                            </div>
                            <div class="comment-btns mt-2">
                                <div class="text-left">
                                    <button class="btn btn-success" type="submit">GỬI</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth.store';
export default {
    data() {
        return {
            comment: {
                content: '',
                star: 0,
            },
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    created() {
        try {
            this.socket = io('http://localhost:3000');
            this.socket.on('comment', (comment) => {
                this.$emit('newcomment', comment);
            });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async sendMessage() {
            try {
                // if (this.comment.content.trim() === '') return;
                // this.socket.emit('comment', this.comment);
                // this.socket.emit('comment', this.comment);
                this.$emit('comment', this.comment);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped lang="scss">
.rating {
    display: flex;
    margin-top: -10px;
    flex-direction: row-reverse;
    margin-left: -4px;
    float: left;

    input {
        display: none;
    }
    input:checked ~ label:before {
        opacity: 1;
    }
}

.rating > label,
.start-icon {
    position: relative;
    width: 19px;
    font-size: 25px;
    color: #ff0000;
    cursor: pointer;
}

.rating > label::before,
.star-icon::before {
    content: '\2605';
    position: absolute;
    opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before,
.star-icon:before {
    opacity: 1 !important;
}

.rating:hover > input:checked ~ label:before {
    opacity: 0.4;
}
</style>
