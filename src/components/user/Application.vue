<template>
<!-- 修改个人信息页面 -->
    <div class="application">
        
            <!-- <div class="upload"> -->
                 <img :src="src" alt="用户头像"  width="100" height="100"> 
                <input type="file" accept="image/gif, image/jpeg" multiple="multiple" @change="upload" placeholder="用户头像">
                
            <!-- </div> -->
                <!-- <input type="file" @change="getFile" ref="file" id="file">  -->
                <!-- <label for="file">画像変更</label> -->
                <div class="information">
                    <label for="userName">用户名:</label>
                    <input type="text" name="userName" v-model="userName" class="userName" required ><br/>
                    <label for="password">密码:</label>
                    <input type="password" name="password" v-model="password" class="password" required><br/>
                    <label for="passWd">确认密码:</label>
                    <input type="password" name="passWd" v-model="passWd" class="passWd" required><br/>
                    <label for="tel">电话号码:</label>
                    <input type="text" name="tel" v-model="tel" class="tel" required><br/>
                    <input type="button" name="button" @click="modify()" value="确认修改" id="modify">
                    <input type="button" name="button" @click="cancel()" value="取消修改" id="cancel">
                    
                </div>
    </div>
</template>
<script>
import md5Crypto from '../../../tool/crypto.js';
export default{
    data () {
      return { 
          userId:'',
        userName:'',
        password:'',
        passWd:'',
        tel:'',
        uname:'',
        userlist:{},
        src: '/static/img/14.jpg' //先设置一个默认图片 转base64码后的data字段
      }
    },
    mounted () {//生命周期
        this.getUser();
    },
    methods: {
        //获取个人信息
        getUser(){
          this.axios.get("/user/session").then(res=>{
              if(res.data.status=='success'){
                  this.userlist=res.data.userInfo;
                  this.userName = res.data.userInfo.userName;
                  this.tel = res.data.userInfo.tel;                  
                //   console.log(this.userlist);
              }
          })
        },
        //确认修改信息
        modify(){
            if(md5Crypto(this.passWd)!=md5Crypto(this.password)){
                alert("请输入相同密码");
            }else if(this.passWd==''||this.password==''){
                alert("密码不能为空");
            }else{
            this.axios.post('/user/update',this.fileData).then(res =>{
                if(res.data.status=='success'){
                      alert(res.data.message);
                      window.location = '/'
                }else{
                    alert(res.data.message);
                }
            })
            }
        },
        //取消修改信息
        cancel(){
            // document.getElementsByTagName('input').value="";
            // this.uname=(this.userlist.userName);
            //  console.log(this.uname); 
            //  $("form").reset(); 
            // location.reload(); 
        },
        //预览图片
        upload (e) { 
            let data = new FormData(); 
            let _this = this;
            var files = e.target.files[0];
            if (!e || !window.FileReader)
                return  // 看支持不支持FileReader
            let reader = new FileReader()
            // 这里是最关键的一步，转换就在这里
            reader.readAsDataURL(files); 
            reader.onloadend = function () {
                 _this.src = this.result;
            },
            data.append('file',e.target.files[0]);
            data.append('userName',this.userName);
            data.append('password',md5Crypto(this.password));
            data.append('userId',this.userlist._id);
            data.append('tel',this.tel);
           let head = {
            headers:{
              'Content-type':'multipart/form-data'
            }
          }
          this.fileData = data;
           console.log(this.fileData);
      },
    }

}
</script>

<style>
.application{
    overflow: hidden;
    
}
.application #file{
    margin-left: 35%; 
}
.information{
    width:100%;
}
.application img{
    border-radius: 50%;
    margin-left: 35%;
    margin-top: 15px;
    margin-bottom: 20px;
}

.information label{
    display: inline-block;
    width: 100px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 80px;
    text-align: center;
}
.information input{
    /* background-color: pink; */
    margin-top: 20px;
    margin-left: 20px;
}
.information #modify{
    margin-top: 20px;
    margin-left: 200px;
}
 .information #cancel{
     margin-top: 20px;
    margin-left: 50px;
 }
</style>