<template>
    <div class="jionCart">
        <!-- 添加购物车VUE引入页面 -->
        <input type="button" value=" + 添加到购物车" @click="joinCart(userId,goodsId)">

    </div>
</template>
<script>
export default {
    props: ["goodsId", "userId"], //父子组件传值
    data() {
        return {};
    },

    methods: {
        joinCart(userId, goodsId) {
            console.log(this.userId, this.goodsId);
            this.axios
                .get("/shopcar/addshopcar", {
                    params: { userId: userId, goodsId: goodsId }
                })
                .then(res => {
                    if (res.data.status == "success") {
                        alert(res.data.message);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style>
.jionCart {
    display: inline-block;
}
.jionCart input {
    margin-left: 0px;
    color: #fff;
    background-color: red;
    margin-left: 50px;
}
</style>