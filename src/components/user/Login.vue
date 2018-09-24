<template>
<!-- 用户登录页面 -->
  <div id="login">
    <form name="loginForm">
      <fieldset >
        <legend>用户登录</legend>
        <label for="userName">用户名</label>
        <input type="text" v-model="userName" id="userName" placeholder="请输入用户名"  required>
        <label for="password">密码</label>
        <input type="password" v-model="password" id="password" placeholder="请输入密码" required>
        <input type="button" value="登录" @click="submitForm()" id="submit">
      </fieldset>
    </form>
  </div>
</template>

<script>
//导入加密包
import md5Crypto from '../../../tool/crypto.js';
export default {
  data () {
      return {
          userName: '',
          password: ''
    }
  },
  methods: {
    submitForm() {
      if(!this.userName || !this.password){
        alert("用户名或密码不能为空")
        return 
      }
      var loginForm={
        userName: this.userName,
        password: md5Crypto(this.password)
      }
        this.axios.post('/user/login', loginForm).then( res => {
           if(res.data.status == 'success'){ //登录成功
              alert(res.data.message)
              window.location = '/'
           }else{
             alert(res.data.message);
          }
        }).catch((err) =>{
           console.log("登录错误"+err);
        })
      }
    }
  }
</script>
<style scoped>
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
  form > fieldset > #submit{
    background-color: #ccc;
}
#login{
   width: 100%;
   height: 580px;
   background-color: #F5F5F5;
}
</style>
