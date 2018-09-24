<template>
    <div class="shopping">
        <div class="shop">
            <!--大div -->
            <Search></Search>
            <!-- 搜索框  -->
            <div class="shopNav">
                <!--  类别导航 -->
                <p>个人闲置 : 类别 > </p>
                <div class="Navnav">
                    <router-link :to=" '/shopping/homeele/'+999">全部</router-link>
                    <router-link :to=" '/shopping/homeele/'+1">家电</router-link>
                    <router-link :to=" '/shopping/homeele/'+2">数码</router-link>
                    <router-link :to=" '/shopping/homeele/'+3">户外</router-link>
                    <router-link :to=" '/shopping/homeele/'+4">图书</router-link>
                    <router-link :to=" '/shopping/homeele/'+5">办公</router-link>
                    <router-link :to=" '/shopping/homeele/'+6">日用</router-link>
                    <router-link :to=" '/shopping/homeele/'+7">珠宝</router-link>
                    <router-link :to=" '/shopping/homeele/'+0">其他</router-link>
                </div>
            </div>
            <div class="shopCenter">
                <!-- 中部  使用按钮 -->
            </div>
            <div class="shopBon">
                <!-- 商品遍历 -->
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import Search from "../Search.vue";
export default {
    components: {
        Search
    },
    data() {
        return {
            Id: ""
        };
    },
    created() {
        this.getLyId();
    },
    methods: {
        getLyId() {
            this.Id = this.$route.params.id;
            console.log(this.Id);
        }
    }
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.shop {
    width: 1100px;
    /* height: 1000px; */
    margin: 0 auto;
    background-color: #f5f5f5;
}
/* 类别导航start  */
.shopNav p {
    line-height: 50px;
}
.shopNav .Navnav {
    width: 1096px;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #fff;
}
.shopNav a {
    text-decoration: none;
    margin-left: 80px;
    line-height: 50px;
}

/* 类别导航 end */
/* 中部  使用按钮 start */
.shopCenter {
    width: 100%;
    height: 70px;
    /* background-color: rosybrown; */
}

/* 中部  使用按钮 end */
/* 商品遍历 start */
.shopBon {
    width: 100%;
}
.shopBon ul {
    margin-left: -30px;
    /* border:1px solid #ccc; */
}
.shopBon ul li {
    list-style-type: none;
    display: inline-block;
    width: 250px;
    height: 400px;
    margin-left: 30px;
    margin-bottom: 10px;
    background-color: #fff;
}
.shopBon img {
    margin: 10px 40px;
}
.shopList p {
    line-height: 30px;
    margin-left: 70px;
}
.shopList {
    width: 250px;
    height: 226px;
    background-color: bisque;
    position: relative;
}
.shopList strong {
    position: absolute;
    display: inline-block;
    width: 60px;
    line-height: 30px;
    text-align: center;
}

/* 商品遍历 end */
</style>