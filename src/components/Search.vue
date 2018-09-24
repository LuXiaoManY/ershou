<template>
    <!-- 搜索框页面 -->
    <div class="search">
        <input type="text" class="sea" placeholder="请输入商品名" v-model="search" />
        <input type="button" class="but " @click="on()" value="搜索" />

    </div>
</template>
<script>
import SearchClass from "./classification/SearchClass";
export default {
    data() {
        return {
            search: ""
        };
    },
    methods: {
        on() {
            if (this.search == "") {
                alert("请输入正确的商品信息");
                return;
            } else {
                this.$router.push({
                    path: "/shopping/searchclass/" + this.search
                });
            }
        }
    }
};
</script>
<style>
.search .sea {
    width: 450px;
    height: 38px;
    border: 1px solid #6f6f6f;
    background-color: #e4e4e4;
    margin-left: 200px;
    margin-top: 16px;
}
.search .but {
    width: 80px;
    height: 40px;
}
</style>