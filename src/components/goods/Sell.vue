<template>
  <!-- 售卖商品页面 -->
  <div class="sell">
    
    <div class="sellCss">
      <!-- 判断用户是否登录 -->
      <li v-if="loginState.userInfo">
          <h1>欢迎来到交易网 请提交您的信息</h1>
        <!--已经登录 -->
        <form name="sellFrom">
          <fieldset>
            <legend>售卖宝贝</legend>
            <label for="goodsName">商品名</label>
            <input type="text" name="goodsName" value="" v-model="goodsName" placeholder="请输入商品名" required>
            <label for="classes">商品类别</label>
            <select name="classes" id="casss" v-model="classes">
              <option value="其他" selected>其他</option>
              <option value="家电">家电</option>
              <option value="数码">数码</option>
              <option value="户外">户外</option>
              <option value="图书">图书</option>
              <option value="办公">办公</option>
              <option value="日用">日用</option>
              <option value="珠宝">珠宝</option>
            </select>
            <!-- <input type="text" name="classes" value="" v-model="classes" placeholder="请输入类别" required>  -->
            <label for="price">商品价格</label>
            <input type="text" name="price" value="" v-model="price" placeholder="请输入价格" required>
            <label for="describe">商品详情</label><br/>
            <!-- resize: none;textarea右下角标志 -->
            <textarea name="describe" v-model="describe" style="height: 60px; width: 340px;" maxlength="20" placeholder="请描述商品详情(不超过20个字)" required></textarea><br/>
            <label for="images">商品图片</label>
            <input type="file" accept="image/gif, image/jpeg" multiple="multiple" @change="upload" placeholder="图片">
            <input type="button" value="提交" @click="addGoods" id="addGoods" />
          </fieldset>
        </form>
      </li>
      <li v-else>
        <!-- 未登录 -->
        <p>您还没有登录,请前往登录后售卖商品</p>
        <router-link :to="{ name: 'Login' }">登录</router-link>
      </li>

    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            goodsName: "",
            classes: "",
            price: "",
            userId: "",
            images: "",
            describe: "",
            classesId: "",
            loginState: {}
        };
    },
    mounted() {
        //生命周期
        this.getUser();
    },
    methods: {
        getUser() {
            //获取当前用户登录状态    并获取用户ID
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
        addGoods() {
            if (this.goodsName == "") {
                alert("请输入用户名");
            } else if (this.classes == "") {
                alert("请输入商品类别");
            } else if (this.price == "") {
                alert("请输入商品价格");
            } else if (this.describe == "") {
                alert("请输入商品详情");
            } else {
                this.axios
                    .post("/goods/addgoods", this.fileData)
                    .then(res => {
                        if (res.data.status == "success") {
                            alert(res.data.message);
                        } else {
                            alert(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        upload(e) {
            var classification = {
                其他: 0,
                家电: 1,
                数码: 2,
                户外: 3,
                图书: 4,
                办公: 5,
                日用: 6,
                珠宝: 7
            };
            var userId = this.loginState.userInfo._id;
            let data = new FormData();
            data.append("file", e.target.files[0]);
            data.append("goodsName", this.goodsName);
            data.append("describe", this.describe);
            data.append("classes", this.classes);
            data.append("classesId", classification[this.classes]);
            data.append("price", this.price);
            data.append("goodsId", this.goodsId);
            data.append("userId", userId);
            let head = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            };
            this.fileData = data;
        }
    }
};
</script>

<style >
h1{
    margin-top: 50px;
}
li {
    list-style-type: none;
}
.sellCss p {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 20px;
}
.sellCss a {
    color: dodgerblue;
    font-size: 30px;
    text-decoration: none;
}
.sell {
    text-align: center;
}
.sellCss {
    width: 500px;
    height: 800px;
    margin: 0 auto;
    /* border:1px solid #ccc; */
}
.sellCss #casss {
    background-color: white;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 5px;
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
}
form {
    width: 400px;
    /* 上下左右边距 */
    margin: 50px auto;
}
form > fieldset {
    /* 上下边距 */
    padding: 30px;
}
form > fieldset > input {
    background-color: white;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 5px;
    box-sizing: border-box;
}
form > fieldset > #addGoods {
    background-color: #ccc;
}
.content {
    width: 100%;
    height: 580px;
    background-color: #f5f5f5;
}
</style>
