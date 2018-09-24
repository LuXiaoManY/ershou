<template>
  <div class="appmain">
    <NavMenu />
    <!--购物车 登录 收藏 消息 -->
    <img src="../assets/img/th.png" width="100%" />
    <div class="appmain1">
      <img class="search2" src="../assets/img/xxx.png" height="60px" width="200px" />
      <Search/>
      <!--搜索框 -->
    </div>
    <div class="appmain2">

      <Find />
      <!--查找 -->
    </div>
  </div>
</template>
<script>
import NavMenu from "./NavMenu.vue";
import Search from "./Search.vue";
import Find from "./Find.vue";
export default {
    components: {
        NavMenu,
        Search,
        Find
    }
};
</script>
<style>
</style>
