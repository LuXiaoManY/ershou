<template>
    <!-- 商品搜索页面 -->
    <div class="searchclass">
        <div class="searchgood">
            <p class="pp">您所搜索的商品名为:
                <i>{{search}}</i>
            </p>
            <ul>
                <li v-for="item in goodslist" :key="item._id" v-if="compare(item.goodsName,search)" @click="details(item._id)">
                    <strong>{{item.classes}}类</strong>
                    <img :src="item.images[0]" width="250" height="250" alt="">
                    <div class="searchlist">
                        <p style="font-size: 24px">{{item.goodsName}}</p>
                        <em>价格:</em>
                        <p class="p1">{{"￥"+item.price}}</p>
                        <i class="p2">{{item.describe}}</i>
                    </div>
                    <div class="searchbt">
                        <input type="button" value="包邮">
                    </div>
                </li>
            </ul>
            <div v-show="show">
                还没有相关商品哦
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            search: "",
            flag: "",
            goodslist: [],
            godsNamelist: []
        };
    },
    created() {
        this.getGoodsList();
        // this.mm();
    },
    methods: {
        getGoodsList() {
            this.search = this.$route.params.search;
            this.axios
                .get("/goods/getallgoods")
                .then(res => {
                    if (res.data.status == "success") {
                        this.goodslist = res.data.message;
                        // console.log(this.goodslist);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //对比商品名
        compare(gname, sname) {
            sname = sname.replace(/\s/gi, "");
            if (gname.indexOf(sname) != -1) {
                this.show = false;
                this.flag = 1;
                return this.flag;
            } else {
                this.flag = 0;
                return this.flag;
            }
        },
        //    mm(){
        //        setTimeout(function(){
        //         if(this.flag==0){
        //            alert("暂时没有");
        //        }
        //        },2000);

        //    }
        details(goodsId) {
            console.log(goodsId);
            this.$router.push({ path: "/details/" + goodsId });
        }
    }
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
}
.searchgood .pp {
    line-height: 60px;
}
.searchgood .pp i {
    font-size: 24px;
    color: red;
}
.searchclass {
    width: 1100px;
    margin: 0 auto;
    /* background-color: pink; */
}
/* .searchgood ul{
    margin-left: -30px;
    /* border:1px solid #ccc; */

.searchgood ul li {
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
.searchgood ul li strong {
    position: absolute;
    left: 190px;
    top: 10px;
    color: red;
    border: 1px solid red;
}
.searchlist {
    /* background-color: blueviolet; */
    width: 250px;
    height: 172px;
}
.searchlist .p1 {
    /* background-color: palegreen; */
    width: 80px;
    margin-left: 60px;
    line-height: 40px;
    font-size: 24px;
    color: red;
}
.searchlist .p2 {
    /* background-color: bisque; */
    display: inline-block;
    width: 250px;
    height: 80px;
    margin-top: 20px;
    text-align: center;
    /* margin-left: 60px;  */
}
.searchlist em {
    position: absolute;
    top: 300px;
}
.searchbt input {
    background-color: #fff;
    color: aqua;
    border: 1px solid aqua;
    float: right;
    margin-top: 2px;
    margin-right: 2px;
}
</style>
