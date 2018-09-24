<template>
<!-- 个人发布商品页 -->
    <div class="release">
        <!-- 获取发布个人商品 -->
        <ul>
            <!-- 遍历用户发布的商品 并进行存放  start-->
            <li v-for="(item,index) in goodslist"  :key="item._id" >
            <img :src="item.images[0]" width="100px" height="100px" class="goodsImg">
            <div class="goodsDes">
                <p>商品名:{{item.goodsName}}</p>
                <p>类别:{{item.classes}}</p>           
                <p>价格:{{"￥"+item.price}}</p>
                <p>详情:{{item.describe}}</p>
            </div>
            <!-- 遍历用户发布的商品 并进行存放  end-->
            
            <!-- 存放修改用户发布商品信息的div  start -->
            <div class="popUp" v-show="flag == index">
                <input type="button" @click="closeOne(index)"  value="X"/>
                <img :src="item.images[0]" width="150px" height="150px" class="gImg"><br/>
                <p>修改图片</p>   <!--修改图片链接 -->
                <strong> 商品名:</strong><input type="text" v-model="item.goodsName"><br/>
                <strong> 类别  :</strong><input type="text" v-model="item.classes"><br/>
                <strong> 价格  :</strong><input type="text" v-model="item.price"><br/>
                <strong> 详情  :</strong><input type="text" v-model="item.describe"><br/>
                <input type="button" @click="updateOne(item,index)" value="更新" />    
            </div>
            <!-- 存放修改用户发布商品信息的div  end-->
            <div class="goodsInput">
                <input type="button"  @click="removeOne(index)" value="修改信息" />
                <input type="button"  @click="deleteOne(item._id,index)" value="删除商品"/>
            </div>
            </li>
        </ul>
         
    </div>
</template>
<script>
export default {
    data(){
        return{
            flag:-1,
            goodsName : '', 
            classes : '',
            price : '', 
            userId : '',    
            images : '' ,
            describe:'',
            goodslist:[],
           
         }
    },
    created(){
        this.getUsergoods();   
    },
   
    methods: {
        // 用户获取自己发布商品列表
        getUsergoods(){//
            // console.log(this.$route.path.id);
            // 分离路由参数中的用户ID(userId)
            var userId={ _id: this.$route.params.id,};
            // 向后端传输用户ID  并获取用户发布商品数据
            this.axios.get("/goods/getusergoods"+'?_id='+this.$route.params.id).then( res => {
                if(res.data.status == 'success'){
                    this.goodslist = res.data.message;
                   
                }
                }).catch( err=>{
                    console.log(err);
                })
        },
        // 用户删除发布商品信息
        deleteOne(key1,index){
            // 通过传商品编号删除数据
            var goodsID={_id:key1};
            // console.log(goodsID);
             this.axios.post("/goods/delgoods",goodsID).then( res => {
                if(res.data.status == 'success'){
                    this.goodslist.splice(index,1,null);
                    this.goodslist = res.data.message;
                    // 自动更新如下
                    // alert("确认删除此商品？");
                    // location.reload(); 
                }else{
                    alert(res.data.message);
                }
                }).catch( err=>{
                    console.log(err);
                })
                 
        }, 
      // 用户修改发布商品信息
        removeOne(index){
         this.flag = index;
        },
        // 更新用户用户发布商品信息
        updateOne(item,index){
            var goodsObj={
                goodsName: item.goodsName,
                classes : item.classes,
                price: item.price,
                _id: item._id, //商品id
                userId: this.$route.params.id, //用户id
                images: item.images || [],
                describe: item.describe,
            }
            // console.log(goodsObj);
            this.axios.post("/goods/updategoods",goodsObj).then( res=> {
                console.log(res.data.message);
                if(res.data.status == 'success'){
                    this.goodslist = res.data.message;
                    alert(res.data.message);
                    this.getUsergoods();//更新商品列表
                    this.flag= -1;
                }else{
                    alert(res.data.message);
                }
            }).catch( err=>{
                    console.log(err);
                })
            
        },
        // 关闭商品更新栏
        closeOne(index){
            this.flag= -1; 
        },
     }       
}
</script>
<style>
.release ul li{
     width: 650px;
     height: 150px;
     float: left;
     margin-left:20px;
     margin-top: 10px;
     border:1px solid #ccc;
     background: #fff;
     overflow: hidden;
}
.release ul li .goodsImg{
    border: 1px solid #ccc;
    margin-left: 20px;
    margin-top: 20px;
}
.release ul li p{
    /* display: inline-block; */
  line-height: 30px;

}

.release .goodsDes{
    display: inline-block;
    width: 350px;
    height: 115px;
    margin-top: 10px;
    margin-left: 20px;
    /* background-color: #fff; */
   
}
.goodsInput{
    display: inline-block;
    width: 130px;
    height: 115px;
    /* background-color: #fff; */
    /* padding-top: 15px; */
    /* float: right; */

}
.goodsInput input{
    display: block;
    margin-top: 37px;
}
.popUp{
    position: fixed;
    width: 500px;
    height: 500px;
    left: 420px;
    top:125px;
    /* margin: auto; */
    border:1px solid #ccc;
    background-color: pink;
    /* z-index:9999; */
    /* overflow: hidden; */
}
.popUp .gImg{
    margin-left: 35%;
} 
.popUp p{
    text-align: center;
}
.popUp input{
     width: 250px;
     height: 30px;
     margin-top: 10px;
     margin-left: 25%;
}
.popUp strong{
    position: absolute;
    left: 30px;
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    /* background-color: #fff; */
}
.popUp input:first-child{
    width: 30px;
    margin-top: 10px;
    margin-left: 90%;
}
.popUp input:last-child{
    width: 100px;
    margin-top: 40px;
    margin-left: 40%;
}
</style>