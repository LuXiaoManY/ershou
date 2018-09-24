const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopCarSchema = new Schema({
    userId: {//所属用户的id
        type: String,
        required: true
    },
    goodsIdList: {
        type: [], //这里存放所属用户的所有商品id
        required: true
    },
    carDate:{
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('ShopCar', ShopCarSchema)