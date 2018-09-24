// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import './assets/my.css'
// import Vuex from 'vuex'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// import VueAxios from 'vue-axios'
Vue.config.productionTip = false
// Vue.use(axios)
Vue.prototype.axios=axios
/* eslint-disable no-new */
// Vue.use(Vuex)
//获取本地购物车缓存数据
// var store = new Vuex.Store({
//   state: {
//     userInfo: {}
//   },
//   mutations: { //一些方法
//     getUserInfo(state) { //this.$store.commit('getUserInfo')
//       this.axios.get('/userssion').then(res => {
//         if(res.data.status == 'success'){
//             state.userInfo = res.data.userInfo
//         }
//       }).carch(err =>{
//           console.log(err)
//       })
//     }
//   },
//   getters: { //this.$store.getters.getterUserInfo
//     getterUserInfo(state){
//         return state.userInfo
//     }
//   }
// })
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>',
  // store, //挂载vuex创建的实例，所有组件都可以访问
  // VueResource,
  // render: h => h(App),
  
  data:{
    eventHub:new Vue()   // 在main.js设置所有组件都能用调用
 },
//  watch: {
//   '$route.path': function (newVal, oldVal) { //监听路由的变化
//     // console.log(oldVal+ '------->'+ newVal)
//   }
// },
//  computed: {}
})
