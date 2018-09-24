import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/user/Register'
import NavMenu from '../components/NavMenu'
import Sell from '../components/goods/Sell'
import Shopping from '../components/goods/Shopping'
import Login from '../components/user/Login'
import Home from '../components/Home'
import Personal from '../components/user/Personal'
import Application from '../components/user/Application'
import Release from '../components/user/Release'
import Cart from '../components/user/Cart'
import Homeele from '../components/classification/Homeele'
import SearchClass from '../components/classification/SearchClass'
import Details from '../components/goods/Details'

Vue.use(Router)

export default new Router({
  routes: [

    { //首页
      path: '/',
      name: 'Home',
      component: Home
    },
    { //注册
      path: '/register',
      name: 'Register',
      component: Register
    },
    { //登录
      path: '/login',
      name: 'Login',
      component: Login
    },
    { //个人中心
      path: '/personal/release/:id',
      name: 'Personal',
      component: Personal,
      children: [ //个人中心子路由
        {
          path: '/personal/release/:id',
          name: 'Release',
          component: Release
        }, //我的发布
        {
          path: '/personal/application/:id',
          name: 'Application',
          component: Application
        }, //修改资料
        {
          path: '/personal/cart/:id',
          name: 'Cart',
          component: Cart
        } //我的购物车
      ],
    },


    { //卖商品
      path: '/sell',
      name: 'Sell',
      component: Sell
    },
    { //买商品
      path: '/shopping/homeele/999',
      name: 'Shopping',
      component: Shopping,
      children: [ //买商品子路由
        {
          path: '/shopping/homeele/:id',
          name: 'Homeele',
          component: Homeele
        }, //分类商品路由

      ]
    },
    { //搜索商品路由
      path: '/shopping/searchclass/:search',
      name: 'SearchClass',
      component: SearchClass
    },
    { //商品详情
      path: '/details/:id',
      name: 'Details',
      component: Details
    },

  ]
})
