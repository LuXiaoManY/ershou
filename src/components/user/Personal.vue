<template>
    <div class="Personal">
            <div class="w">
                <!-- 个人中心top  start -->
            <div class="per-top">
                <img :src="loginState.userInfo.headPortrait"  alt="">
                 <li  v-if="loginState.userInfo">
                  <span>{{loginState.userInfo.userName}} </span>
                 </li>
            </div>
            <!-- 个人中心top end -->
            <!-- 个人中心center start -->
            <div class="per-center">
                <div class="per-c-l"> 
                    <!-- 路由带参(userId)跳转 -->
                    <router-link :to= "'/personal/application/'+this.userId " >修改资料</router-link>
                    <router-link :to= "'/personal/release/'+this.userId " >我的发布</router-link>
                    <router-link :to= "'/personal/cart/'+this.userId " >购物车</router-link>  
                </div>
                <div class="per-c-r">
                    
                    <router-view/>
                </div>
            </div>
            <!-- 个人中心center end -->
           
        </div>
    </div>
</template>
<script>
import Login from './Login.vue'
import Application from './Application.vue'
import Release from './Release.vue'
import Cart from './Cart.vue'
export default {
    components: {
          Login,
          Application,
          Cart,
          Release
         
    },
    data(){
        return{
            userId:'',
            loginState:{}
         }
    },
    created(){
         this.getUser()
    },
     methods: {
       getUser(){//获取当前用户登录状态
          this.axios.get('/user/session').then( res => {
              if(res.data.status == 'success'){
                this.loginState = res.data;
                this.userId=res.data.userInfo._id;//获取userId上传路由参数
              }
              }).catch( err=>{
                  console.log(err);
              })
          },
     }
}
</script>
<style>
*{
    margin:0;
    padding:0;
    list-style: none;
}
.Personal{
    width: 100%;
    /* height: 620px; */
    background-color: #ccc;
}
.w{
    width: 1000px;
    height: 850px;
    margin: 0 auto;
    background-color: #fff;
}
/* 个人top start */
.per-top{
    width: 100%;
    height: 140px;
    background-color: #5d5558;
    padding-top: 30px;
    /* position: relative; */
   
}
.per-top img{
    width: 100px;
    height: 100px;
    /* margin-top: 50px; */
    margin-left: 50px;
    border-radius: 50%;
    background-color: #fff;
}
.per-top span{
    /* position: absolute;
    left: 50px;
    bottom: 20px; */
    display:block;
    width: 50px;
    height: 30px;
    margin-left: 80px;
}
/* 个人top end */
/* 个人中间 start */
.per-center{
    
    width: 1000px;
    height: 680px;
    /* background-color: pink; */
}
.per-c-l{
    width: 296px;
    /* height: 680px; */
    float: left;
    border:2px solid #ccc;
    background-color: #fff;
}
.per-c-l a{
    text-decoration: none;
    display: block;
    line-height: 40px;
    background-color: #ccc;
    margin-top:3px;
}
.per-c-r{
    width: 696px;
    height: 680px;
    float: right;
    overflow: auto;
    border:2px solid #ccc;
    /* background-color:pink; */
}
/* 个人中间 end */
/* 个人bottom start */
.per-button{
    width: 100%;
    height: 50px;
    position: relative;
    /* background-color: pink; */
}
.per-button p{
    margin-left: 30px;
}
.per-button .logo1{
    position: absolute;
    left: 700px;
    bottom: 0px;
}
.per-button .logo2{
    position: absolute;
    left: 900px;
    bottom: 0px;
}
/* 个人bottom end */

</style>