<template>
<!-- 购物车 -->
    <div class="shopcar">
        <!-- 商品列表区 -->
        <div class="goods-list">
            <ul>
               <li v-for="(item,index) in goodslist" :key="item._id">
                  <input type="checkbox" class="check" v-model="checked[index]">
                  <img src="" width="100" height="100" alt="">
                  <div class="cartList">
                      <!--商品信息区 -->
                      <p>商品名: {{item.goodsName}}</p>
                      <p>类别:{{item.classes}}</p>
                      <p>价格:{{"￥"+item.price}}</p>
                      <p>详情:{{item.describe}}</p>
                  </div>

                  <div class="cartSum">
                      <input type="button" value="-" @click="reduceOne(item,index)">
                      <input type="text" value="" v-model="item.cunt" class="number">
                      <input type="button" value="+" @click="addOne(item,index)"><br/>
                      <input type="button" value="移出购物车" @click="detelebtn(item._id,index)" class="delete-bnt">
                  </div>
               </li>
             </ul>
        </div>
        <div class="kongbai">

        </div>
        <!-- 结算区 -->
        <div class="computed">
            <p>总计:{{money}} 元</p>
            <input type="button" value="确认购买">
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      goodslist: [],
      checked: [], //是否勾选
      money: 0
      // money: 0
    };
  },
  watch: {
    goodslist: function(){
      var sum = 0;
      this.goodslist.forEach((item, index) => {
        console.log(index);
        if (this.checked[index] == true) {
          sum += item.cunt * item.price;
        }
      });
      this.money = sum;
    },
    checked: function() {
      var sum = 0;
      this.goodslist.forEach((item, index) => {
        console.log(index);
        if (this.checked[index] == true) {
          sum += item.cunt * item.price;
        }
      });
      this.money = sum;
    },
    money: function() {
      var sum = 0;
      this.goodslist.forEach((item, index) => {
        console.log(index);
        if (this.checked[index] == true) {
          sum += item.cunt * item.price;
        }
      });
      this.money = sum;
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取到用户的id获取购物车商品列表
      var useId = this.$route.params.id;
      this.axios
        .get("/shopcar/getshopcarlist" + "?userId=" + this.$route.params.id)
        .then(res => {
          if (res.data.status == "success") {
            this.goodslist = res.data.message;
            this.goodslist.forEach((item, index) => {
              item.cunt = 1;
              // item.selected = true;
              this.checked[index] = true;
              this.money += item.price;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //删除购物车商品信息
    detelebtn(goodsId,index) {
      //   console.log(goodsId);
      //   console.log(this.$route.params.id);

      this.axios
        .get("/shopcar/removeshopcar", {
          params: { userId: this.$route.params.id, goodsId: goodsId }
        })
        .then(res => {
          if (res.data.status == "success") {
            this.goodslist.splice(index,1)
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 减一件
    addOne(item, index) {
      this.num++;
      item.cunt++;
      this.money = this.money + item.price;
    },
    reduceOne(item, index) {
      this.num--;
      if (item.cunt > 1) {
        item.cunt--;
        this.money = this.money - item.price;
      }
    }
  }
};
</script>

<style>
/* <!-- 商品列表区 --> */
.shopcar{
  width: 100%;
}
.goods-list {
  width: 696px;
  background-color: palegreen;
}
.goods-list .check {
  position: absolute;
  left: 13px;
  top: 70px;
}
.goods-list ul li {
  position: relative;
  margin-left: 36px;
  width: 630px;
  height: 155px;
  border: 1px solid #ccc;
  overflow: hidden;
  margin-bottom: 10px;
}
.goods-list ul img {
  margin-top: 20px;
  margin-left: 40px;
  float: left;
}

.cartList {
  width: 290px;
  height: 150px;
  float: left;
  position: relative;
}
.cartList p {
  line-height: 33px;
  margin-left: 60px;
}
.cartSum {
  width: 150px;
  height: 150px;
  float: left;
}
.cartSum .number {
  width: 50px;
}
.cartSum input {
  margin-top: 30px;
}
.cartSum .delete-bnt {
  margin-top: 30px;
}

/* 底部结算区 */
.computed {
  position: fixed;
  bottom: 0%;
  width: 677px;
  height: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.computed p {
  margin-left: 40px;
  margin-top: 20px;
}
.computed input {
  position: absolute;
  height: 50px;
  width: 78px;
  left: 573px;
  top: 0px;
}
</style>
