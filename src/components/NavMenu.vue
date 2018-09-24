
<template>
    <!-- 上面导航条start -->
    <div class="navigation">
        <div class="tt">
            <router-link :to="{ name: 'Home' }">首页</router-link>
            <!-- <router-link :to="'/shoppingcart'" >购物车</router-link>         -->
            <router-link :to="'/shopping/homeele/'+999">我要买宝贝</router-link>
            <router-link :to="{ name: 'Sell' }">我要卖宝贝</router-link>
            <!-- 判断用户是否登录  -->
            <li v-if="loginState.userInfo">
                <!-- 已经登录显示个人主页 -->
                <router-link :to="'/personal/release/'+this.loginState.userInfo._id">
                    <span> <img :src="this.loginState.userInfo.headPortrait" width="30" height="30" class="Head" alt=""> {{loginState.userInfo.userName}} </span>
                </router-link>
                <!-- <span>当前用户:{{loginState.userInfo.userName}}&nbsp; -->
                <button @click="logOut" type="primary">退出登录</button>
            </li>
            <li v-else>
                <!-- 未登录显示登录和注册 -->
                <router-link :to="{ name: 'Login' }">登录</router-link>
                <router-link :to="{ name: 'Register' }">注册</router-link>
            </li>
        </div>

    </div>
</template>

<script>
import Register from "./user/Register.vue";
import Sell from "./goods/Sell.vue";
import Login from "./user/Login.vue";
export default {
    components: {
        Register,
        Sell,
        Login
    },
    data: function() {
        return {
            loginState: {}
        };
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            //获取当前用户登录状态
            this.axios
                .get("/user/session")
                .then(res => {
                    if (res.data.status == "success") {
                        this.loginState = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logOut() {
            //个人登录后退出当前用户
            this.axios
                .get("/user/logout")
                .then(res => {
                    if (res.data.status == "success") {
                        window.location = "/";
                    }
                })
                .catch(err => {
                    this.$message({
                        messager: err,
                        type: "error"
                    });
                });
        }
    }
};
</script>
<style>
.navigation {
    width: 100%;
    height: 35px;
    background-color: #ccc;
    text-align: center;
    text-decoration: none;
}
.navigation a {
    text-decoration: none;
    margin-left: 150px;
}
.tt {
    width: 1500px;
    height: 35px;
    margin: 0 auto;
    /* background-color: red; */
}
.tt li {
    /* background-color: #fff; */
    list-style-type: none;
    display: inline-block;
}

.tt .Head {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>


