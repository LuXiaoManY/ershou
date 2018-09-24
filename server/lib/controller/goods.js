const GoodsModels = require('../models/Goods')
const _ = require('lodash')
const formidable = require('formidable')
var sd = require("silly-datetime");
class Goods {
  async addGoods(req, res, next) { //增加商品
    console.log("请求发起")
    console.log(res);
    const body = req.body //前端发送的字段数据
    console.log("前端字段信息=========================");
    console.log(body)
    const file = req.file //前端的文件数据
    console.log("添加的文件信息=======================");
    console.log(file)
    try {
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
        const images = []
        const newName = '/public/upload/images/' + file.filename
        images.push(newName)
        const goodsObj = {
          goodsName: body.goodsName, //商品名称
          describe: body.describe, //商品描述
          classes: body.classes, //商品类别
          classesId: body.classesId, //商品类别Id
          price: parseInt(body.price), //商品价格
          userId: body.userId, //用户id
          images: images || '/public/upload/images/logo.png'
        }
        console.log("前台商品添加的数据======================");
        console.log(goodsObj);
        await GoodsModels.create(goodsObj)
        res.send({
          status: 'success',
          message: '添加成功'
        })
      } else {
        res.send({
          status: 'error',
          message: '图片格式错误'
        })
      }
    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '输入数据不符合规定，请重新输入'
      })
    }
  };

  async delGoods(req, res, next) { //删除商品
    const body = req.body
    const Id = body._id
    try {
      console.log(Id);
      const id = await GoodsModels.find({
        _id: Id
      })
      if (!_.isEmpty(id)) { //存在这个商品
        // console.log(GoodsModels.deleteOne({_id: id}))
        await GoodsModels.deleteOne({
          _id: id
        })
        res.send({
          status: 'error',
          message: '删除成功'
        })
      } else {
        res.send({
          status: 'error',
          message: '不存在该商品'
        })
      }
    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '删除失败'
      })
    }
  };
  async updateGoods(req, res, next) { //修改商品信息
    const body = req.body
    console.log(body);
    const Id = body._id //商品的id
    // console.log(Id);
    const goodsObj = {
      goodsName: body.goodsName,
      price: body.price,
      userId: body.userId, //用户的id
      images: body.images || [],
      classes: body.classes || '',
      describe: body.describe || '',
    }
    try {
      let goods = GoodsModels.findOne({
        _id: Id
      })
      if (!_.isEmpty(goods)) { //修改对应id的商品信息
        await GoodsModels.findOneAndUpdate({
          _id: Id
        }, {
          $set: goodsObj
        })
        res.send({
          status: 'success',
          message: '修改成功'
        })
      } else {
        res.send({
          status: 'error',
          message: '修改失败'
        })
      }

    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '系统繁忙，稍后再试'
      })
    }
  }
  async getAllGoods(req, res, next) { //获取所有商品
    try {
      let goodsList = await GoodsModels.find();
      res.send({
        status: 'success',
        message: goodsList
      })
    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '获取商品列表失败'
      })
    }
  };
  async getUserGoods(req, res, next) { //根据用户的id获取该用户的商品
    const body = req.query //这里获取前端路由中的参数(get)
    // console.log(body);
    // const body = req.body//(post)
    const id = body._id
    // console.log(id);
    try {
      const userGoodsList = await GoodsModels.find({
        userId: id
      })
      res.send({
        status: 'success',
        message: userGoodsList
      })
    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '获取失败'
      })
    }
  };
  async getClassesGoods(req, res, next) { //根据商品类别获取商品
    const body = req.query //这里获取前端路由中的参数(get)
    const id = body.classesid
    //分类类别的id
    try {
      const classesGoodsList = await GoodsModels.find({
        classesId: id
      })
      res.send({
        status: 'success',
        message: classesGoodsList
      })
    } catch (err) {
      console.log(err)
      res.send({
        status: 'error',
        message: '获取失败'
      })
    }
  }
}

module.exports = new Goods()
