const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{ //用户名
        type: String,
        required: true
    },
    password: { //密码
        type: String,
        required: true
    },
    tel: {
        type: Number,
        default: ''
    },
    isLogin:{ //是否已经登录
        type: Boolean,
        default: false
    },
    headPortrait:{ //用户头像
        type: String,
        default: '/public/upload/images/logo.png'
    },
    userDate:{ //用户创建日期
        type: Date,
        default: Date.now()
    }
})


//mongoose会自动在数据库中创建一个user集合(表)
module.exports = mongoose.model('User',userSchema)