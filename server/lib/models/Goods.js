const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsSchema = new Schema({
    goodsName:{ //商品的名称
        type: String,
        required: true
    },
    price:{ //商品价格
        type: Number,
        required: true
    },
    goodsDate:{ //商品创建日期
        type: Date,
        default: Date.now
    },
    userId:{ //这里放该商品属于哪个用户的id，表示属于某一个用户的商品
        type: String,
        required: true
    },
    classesId:{//商品分类的id
        type: Number,
        default: 0 //默认为其他
    },
    images:{ //这里放商品的图片
        type: [],
        default: '/public/upload/images/logo.png'
    },
    classes:{//商品类别
        type:String,
    },
    describe:{//商品描述
        type:String,
        default:"暂无描述"
    }
})


//mongoose会自动在数据库中创建一个user集合(表)
module.exports = mongoose.model('Goods',goodsSchema)