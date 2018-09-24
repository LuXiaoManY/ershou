const express = require('express')
const router = express.Router()
const User = require('../lib/controller/user')
const Goods = require('../lib/controller/goods')
const ShopCar = require('../lib/controller/shopCar')
//导入图片上传模块
const upload = require('../utils/multer')


router.get('/user/session',(req,res) => {   //用户登录状态
    res.send({
        status: 'success',
        userInfo: req.session.user,
        login: req.session.login
    })
})
router.post('/user/register',User.userRegist) //用户注册接口
router.post('/user/login',User.userLogin)   //用户登录接口
router.get('/user/logout',User.userLogout)  //用户退出接口
router.post('/user/update',upload.single('file'),User.userUpdate) //用户修改信息接口

router.get('/goods/getusergoods',Goods.getUserGoods) //获取单个用户的所有商品
router.get('/goods/getclassesgoods',Goods.getClassesGoods)  //获取指定类别的商品
router.get('/goods/getallgoods',Goods.getAllGoods)//获取所有商品
router.post('/goods/addgoods',upload.single('file'),Goods.addGoods)    //商品添加接口 
router.post('/goods/delgoods',Goods.delGoods)    //商品删除接口
router.post('/goods/updategoods',Goods.updateGoods) //修改商品信息

router.get('/shopcar/getshopcarlist',ShopCar.getShopCar) //获取当前用户购物车
router.get('/shopcar/addshopcar',ShopCar.addShopCar) //加入购物车
router.get('/shopcar/removeshopcar',ShopCar.removeShopCar) //移出购物车
module.exports = router
