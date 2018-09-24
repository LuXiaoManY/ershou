<template>
<div id="Home">
    <div class="home">
        <!-- 连入轮播图 -->
        <slides></slides>
        <!-- 搜索框 -->
        <div class="seek">
            <router-link class="aa" :to="'/shopping/homeele/'+999" >我要买宝贝 > </router-link>
            <Search></Search>
            <ul>
                <router-link :to=" '/shopping/homeele/'+999" >全部</router-link>
                <router-link :to=" '/shopping/homeele/'+1" >家电</router-link>
                <router-link :to=" '/shopping/homeele/'+2" >数码</router-link>
                <router-link :to=" '/shopping/homeele/'+3" >户外</router-link>
                <router-link :to=" '/shopping/homeele/'+4" >图书</router-link>
                <router-link :to=" '/shopping/homeele/'+5" >办公</router-link>
                <router-link :to=" '/shopping/homeele/'+6" >日用</router-link>
                <router-link :to=" '/shopping/homeele/'+7" >珠宝</router-link>
                <router-link :to=" '/shopping/homeele/'+0" >其他</router-link> 
            </ul>
        </div>
        <!-- 商品展示框 -->
        <p class='P1'>数码商品区</p>
        <div class="body-one">
            <ul>
                <li v-for="item in list.slice(0,4)" :key="item._id"  @click="details(item._id)" >  <!-- v-if="item.classes == '数码'"  -->
                    <img :src="item.images[0]" width="100" height="100" alt="">
                    <div class="b-o-r">
                        
                        <strong>商品名:</strong> <p>{{item.goodsName}}</p>
                        <strong>类别:</strong> <p>{{item.classes}}</p>           
                        <strong>价格:</strong> <p>{{"￥"+item.price}}</p>
                        <strong>详情:</strong> <p>{{item.describe}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <p class='P2'>商品二区</p>
        <div class="body-two">
            <ul>
               <li v-for="item in list.slice(0,4)" :key="item._id"   @click="details(item._id)"><!-- v-if="item.classes == '图书'" -->
                    <img :src="item.images[0]"  width="100" height="100" alt="">
                    <div class="b-o-b">
                        <strong>商品名:</strong><p>{{item.goodsName}}</p>
                        <strong>类别:</strong><p>{{item.classes}}</p>           
                        <strong>价格:</strong><p>{{"￥"+item.price}}</p>
                        <strong>详情:</strong><p>{{item.describe}}</p>
                    </div>
               </li>
          </ul>
        </div>
    </div>
</div>    
</template>
<script>
import Search from './Search.vue'
import slides from './slides.vue'
export default {
    components: {
          slides,
          Search
    },
    data(){
          return{
            list:[],
            userId:'',
            goodsId:'',
         }
    },
    created(){
         this.getGoods();
         this.getUser();
         
    },
    methods: {
        getGoods(){//获取商品 
            this.axios.get('/goods/getallgoods').then( res => {
                if(res.data.status == 'success'){
                    this.list = res.data.message;
                    
                }
                }).catch( err=>{
                    console.log(err);
                })
            }, 
        getUser(){//获取当前用户登录状态
            this.axios.get('/user/session').then( res => {
                if(res.data.status == 'success'){
                    this.loginState = res.data;
                    this.userId=res.data.userInfo._id;
                    // console.log(this.userId);
                }
                }).catch( err=>{
                    console.log(err);
                })
            },  
            details(goodsId){
              console.log(goodsId);
              this.$router.push({path:'/details/'+goodsId,});
          },  
     }
}
</script>
<style scoped>
#Home{
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.home{
    width: 1500px;
    margin:0 auto;
    /* height: 1000px; */
    /* background-color: pink; */
}
.seek{
    width: 1200px;
    height: 200px;
    position: relative;
    left:10%;
    top:-60px;
    background-color: white;
    border-radius: 25px;
    border: 1px solid #ccc;
}
.seek .aa{
    position: absolute;
    left:30px;
    top:20px;
    text-decoration: none;
    color:black;
    font-size: 20px;
}
.seek ul{
    width: 800px;
    height: 100px;
    margin-top: 40px;
    margin-left: 10px;
    /* background-color: #fff; */
  
}
.seek ul a{
    text-decoration: none;
    width: 83px;
    height:50px;
    float: left;
    text-align: center;
    font-size: 20px;
    /* background-color: red; */
    

}

.home p{
    margin-left: 70px;
}
.home .P1{
    margin-left: 150px;
}
.home .P2{
    margin-left: 150px;
}
.body-one{
    width: 1200px;
    height: 300px;
    margin-left: 150px;
    background-color: #ccc;
    margin-top: 10px;
}
.body-one ul li{
    /* display: inline-block; */
    width: 500px;
    height: 140px;
    float: left;
    margin-top: 5px;
    margin-left: 60px;
    background-color: #fff;
    border:1px solid #ccc;    
}
.body-one ul li img{
    margin-top: 15px;
    margin-left: 20px;
}
.b-o-r{
    width: 350px;
    height: 140px;
    display: inline-block;
    /* float: right; */
    /* background-color: greenyellow; */
}
.b-o-r p{
    line-height: 25px;
}
.b-o-r strong{
    position: absolute;
    width: 60px;
    height: 30px;
    text-align: center;    
}
.body-two ul li img{
    margin-top: 15px;
    margin-left: 20px;
}
.b-o-b{
    width: 350px;
    height: 140px;
    display: inline-block;
    /* float: right; */
    /* background-color: greenyellow; */
}
.b-o-b p{
    line-height: 25px;
}
.b-o-b strong{
    position: absolute;
    width: 60px;
    height: 30px;
    text-align: center;
}
.body-two{
    background-color: #ccc;
    width: 1200px;
    height: 300px;
    margin-left: 150px;
    margin-top: 80px;
    
}
.body-two ul li{
    /* display: inline-block; */
    width: 500px;
    height: 140px;
    float: left;
    margin-top: 5px;
    margin-left: 60px;
    background-color: #fff;
    border:1px solid #ccc; 
}
</style>