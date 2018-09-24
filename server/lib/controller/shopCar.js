const ShopCarModel = require('../models/ShopCar')
const GoodsModels = require('../models/Goods')
const _ = require('lodash')

class ShopCar {
    async getShopCar(req, res, next) { //根据用户id给前台返回当前用户的购物车
        const body = req.query //获取参数
        console.log("=================获取购物车的用户================");
        console.log(body);
        const userId = body.userId
        try {
            const shopCarObj = await ShopCarModel.findOne({
                userId: userId
            }) //查询该用户是否有购物车（没有加商品到购物车）
            console.log("==============该用户的购物车信息=============");
            console.log(shopCarObj)
            const getUserAllShopCar = [] //这里存放用户购物车中的所有商品信息
            if (!_.isEmpty(shopCarObj)) { //购物车表里存在该用户
                const goodsIdList = shopCarObj.goodsIdList //商品id列表
                console.log(goodsIdList);
                for (let index = 0; index < goodsIdList.length; index++) {
                    const element = goodsIdList[index] //购物车里面单个商品的id
                    let goodsObj = await GoodsModels.findOne({
                        _id: element
                    })
                    if (!_.isEmpty(goodsObj)) { //如果商品表中存在这个商品，返回该商品
                        getUserAllShopCar.push(goodsObj)
                    }
                }
            }
            res.send({
                status: 'success',
                message: getUserAllShopCar
            })
        } catch (err) {
            console.log(err)
            res.send({
                status: 'error',
                message: '网络繁忙，稍后再试'
            })
        }
    }
    async addShopCar(req, res, next) { //根据用户id和商品id添加购物车
        const body = req.query
        console.log("=============请求添加购物车的用户的id和商品的id=============")
        console.log(body)
        const userId = body.userId
        const goodsId = body.goodsId
        try {
            const shopCarObj = await ShopCarModel.findOne({
                userId: userId
            })
            console.log(shopCarObj)
            if (_.isEmpty(goodsId) || _.isEmpty(userId)) {
                res.send({
                    status: 'error',
                    message: '商品id或者用户id不能为空'
                })
            } else if (!_.isEmpty(shopCarObj)) { //存在该用户
                //查找该用户的购物车里的商品id数组，如果有，就不操作，保证购物车里面一个商品只有一个
                //如果没有，将商品id放入商品id数组
                let length = shopCarObj.goodsIdList.length
                let flag = false //标记该用户有没有该商品
                for (let index = 0; index < length; index++) {
                    if (goodsId == shopCarObj.goodsIdList[index]) {
                        flag = true
                        break
                    }
                }
                if (!flag && !_.isEmpty(goodsId)) { //该用户没有该商品，添加商品id到列表中
                    const newGoodsList = shopCarObj.goodsIdList
                    console.log("============以前的购物车==========");
                    console.log(newGoodsList)
                    newGoodsList.push(goodsId)
                    console.log("==========添加后的购物车============");
                    console.log(newGoodsList)
                    await ShopCarModel.findOneAndUpdate({
                        userId: userId
                    }, {
                        $set: {
                            goodsIdList: newGoodsList
                        }
                    })
                    res.send({
                        status: 'success',
                        message: '加入购物车成功'
                    })
                    return //多次res.send可能有异常，这里加上return
                }
                res.send({
                    status: 'success',
                    message: '加入购物车成功'
                })
            } else { //该用户没有加入购物车的记录
                let userObj = {
                    userId: userId,
                    goodsIdList: goodsId
                }
                await ShopCarModel.create(userObj)
                res.send({
                    status: 'success',
                    message: '加入购物车成功'
                })
            }
        } catch (err) {
            console.log(err)
            res.send({
                status: 'err',
                message: '网络繁忙，稍后再试'
            })
        }
    }
    async removeShopCar(req, res, next) { //根据用户id和商品id移除购物车里面的商品
        const body = req.query
        console.log("=============请求移除购物车的用户的id和商品的id=============")
        console.log(body)
        const userId = body.userId
        console.log(userId)
        const goodsId = body.goodsId
        try {
            const shopCarObj = await ShopCarModel.findOne({
                userId: userId
            })
            console.log(shopCarObj)
            //查找该用户的购物车里的商品id数组,移除这个id
            let length = shopCarObj.goodsIdList.length

            const newGoodsList = shopCarObj.goodsIdList
            console.log("============以前的购物车==========");
            console.log(newGoodsList)
            for (let index = 0; index < length; index++) {
                if (goodsId == shopCarObj.goodsIdList[index]) {
                    newGoodsList.splice(index, 1) //移除这个商品
                    break
                }
            }
            console.log("==========移除后的购物车============");
            console.log(newGoodsList)
            await ShopCarModel.findOneAndUpdate({
                userId: userId
            }, {
                $set: {
                    goodsIdList: newGoodsList
                }
            })
            res.send({
                status: 'success',
                message: '移除成功'
            })
        } catch (err) {
            console.log(err)
            res.send({
                status: 'err',
                message: '系统繁忙，稍后再试'
            })
        }
    }
}
module.exports = new ShopCar()