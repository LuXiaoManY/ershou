<template>
<!-- 注册页面start -->
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div class="content">
        <form name ="registerForm">
            <fieldset >
                <legend>用户注册</legend>
                <label for="userName">用户名</label>
                <input type="text" name="username" v-model="userName" placeholder="请输入姓名" required>
                <label for="password">密码</label>
                <input type="text" name="password"  v-model="password" placeholder="请输入密码" required>
                <input type="button" value="注册" @click="addUser" id="addUser">
            </fieldset>
        </form>
    </div>
  </div>
</template>
<script>
import md5Crypto from '../../../tool/crypto.js';
export default {
  data () {
    return {
      // msg: 'Welcome to Your 注册 哈哈',
      userName: '',
      password:''
    }
  },
  methods: {
    addUser() {//注册用户
      var name = this.userName;
      var password = md5Crypto(this.password);
      var json={ userName: name, password: password};
      this.axios.post('/user/register',json).then((response) => {
        if(response.data.status=='success'){
            alert("注册成功 跳转登录页面。。。");
            this.$router.push('/login');
        }else{
            alert(response.data.message);
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  }
}
</script> 
<style >

body{
    margin: 0;
    padding: 0;
  }
  form{
    width: 400px;

    /* 上下左右边距 */
    margin: 50px auto; 
  }
  form > fieldset{
    /* 上下边距 */
    padding: 30px;
  }
  form > fieldset > input{
    background-color: white;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 5px;
    box-sizing: border-box
  }
  form > fieldset > #addUser{
    background-color: #ccc;
}
.content{
   width: 100%;
   height: 580px;
   background-color: #F5F5F5;
}
</style>