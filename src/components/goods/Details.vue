<template>
    <div class="Details">
        <!-- 商品详情页面 -->
        <div class="goodsdet">
            <ul>
                <li v-for="item in goodslist" :key="item._id" v-if="item._id == goodsId">
                    <img :src="item.images[0]" width="400" height="400" alt="">
                    <div class="goodsdetlist">
                        <strong>{{item.classes}}类</strong>
                        <p style=" font-size: 50px ">{{item.goodsName}}</p>
                        <i style=" font-size: 16px    ">购买还送精美外包装哦</i>
                        <em>价格:</em>
                        <p class="p1">{{"￥"+item.price}}</p>
                        <em>商品描述:</em>
                        <p class="p2">{{item.describe}}</p>
                        <div class="angoods">
                            <input type="button" value="立即购买">
                            <jionCart :goodsId='item._id' :userId='userId'></jionCart>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import jionCart from "../classification/jionCart";
export default {
    components: {
        jionCart
    },
    data() {
        return {
            goodslist: {},
            goodsId: "",
            userId: ""
        };
    },
    created() {
        this.getGoodslist();
        this.getUser();
    },

    methods: {
        getGoodslist() {
            //获取商品列表
            this.goodsId = this.$route.params.id;
            // console.log(this.goodsId);
            this.axios
                .get("/goods/getallgoods")
                .then(res => {
                    if (res.data.status == "success") {
                        this.goodslist = res.data.message;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getUser() {
            //获取当前用户登录状态
            this.axios
                .get("/user/session")
                .then(res => {
                    if (res.data.status == "success") {
                        this.loginState = res.data;
                        this.userId = res.data.userInfo._id;
                        // console.log(this.userId);
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
li {
    list-style-type: none;
}
.goodsdet {
    width: 1100px;
    height: 600px;
    margin: 0 auto;
    /* background-color: greenyellow; */
}
.goodsdet img {
    margin-top: 50px;
    margin-left: 50px;
    float: left;
}
.goodsdetlist {
    width: 500px;
    height: 400px;
    margin-top: 50px;
    margin-left: 30px;
    float: left;
    /* background-color: #fff; */
    position: relative;
}
.goodsdetlist i {
    position: absolute;
    left: 135px;
    top: 140px;
    color: red;
}
.goodsdetlist strong {
    position: relative;
    left: 390px;
    top: 20px;
}
.goodsdetlist .p1 {
    /* background-color: red; */
    width: 150px;
    margin-left: 100px;
}
.goodsdetlist .p2 {
    /* background-color: red; */
    width: 380px;
    height: 60px;
    margin-left: 100px;
}
.goodsdetlist em {
    position: absolute;
}
.angoods {
    width: 500px;
    height: 100px;
    margin-top: 37px;
    /* background-color:palegreen; */
}
.angoods input {
    width: 150px;
    height: 60px;
    border: 1px solid red;
    background-color: pink;
    color: red;
    margin-left: 50px;
    margin-top: 20px;
}
</style>