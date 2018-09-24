<template>
    <!-- 商品分类页面 -->
    <div class="homeele">
        <div class="classgood">
            <ul>
                <li v-for="item in goodslist" :key="item._id" @click="details(item._id)">
                    <strong>{{item.classes}}类</strong>
                    <img :src="item.images[0]" width="250" height="250" alt="">
                    <div class="shopList">
                        <p style="font-size: 24px">{{item.goodsName}}</p>
                        <em>价格:</em>
                        <p class="p1">{{"￥"+item.price}}</p>
                        <i class="p2">{{item.describe}}</i>
                    </div>
                    <div class="shopbt">
                        <input type="button" value="包邮">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodslist: []
        };
    },
    mounted() {
        this.getClassesGoods();
    },
    watch: {
        //监听路由变化 执行相应的方法
        $route: "getClassesGoods"
    },
    methods: {
        getClassesGoods() {
            var classesId = { classesId: this.$route.params.id };
            if (this.$route.params.id == 999) {
                //idwei999时，获取全部商品
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
            } else {
                // 向后端传输类别ID  并获取相应类别的商品
                this.axios
                    .get(
                        "/goods/getclassesgoods/" +
                            "?classesid=" +
                            this.$route.params.id
                    )
                    .then(res => {
                        if (res.data.status == "success") {
                            this.goodslist = res.data.message;
                            // console.log(this.goodslist);
                        } else {
                            alert(res.data.message);
                            // console.log(this.goodslist);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        details(goodsId) {
            console.log(goodsId);
            this.$router.push({ path: "/details/" + goodsId });
        }
    }
};
</script>
<style>
/* 调整商品显示CSS */
* {
    margin: 0;
    padding: 0;
}
.classgood ul {
    margin-left: -30px;
    /* border:1px solid #ccc; */
}
.classgood ul li {
    list-style-type: none;
    display: inline-block;
    width: 250px;
    height: 450px;
    margin-left: 30px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    background-color: #fff;
    position: relative;
}
.classgood ul li strong {
    position: absolute;
    left: 190px;
    top: 10px;
    color: red;
    border: 1px solid red;
}
.shopList {
    /* background-color: blueviolet; */
    width: 250px;
    height: 172px;
}
.shopList .p1 {
    /* background-color: palegreen; */
    width: 80px;
    margin-left: 60px;
    line-height: 40px;
    font-size: 24px;
    color: red;
}
.shopList .p2 {
    /* background-color: bisque; */
    display: inline-block;
    width: 250px;
    height: 80px;
    margin-top: 20px;
    text-align: center;
    /* margin-left: 60px;  */
}
.shopList em {
    position: absolute;
    top: 300px;
}
.shopbt input {
    background-color: #fff;
    color: aqua;
    border: 1px solid aqua;
    float: right;
    margin-top: 2px;
    margin-right: 2px;
}
</style>
