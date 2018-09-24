const UserModels = require('../models/User')
const _ = require('lodash')

class User {
    async userRegist(req, res, next) { //用户注册
        const body = req.body
        console.log("注册的用户" + body)
        try {
            const user = await UserModels.find({
                userName: body.userName
            })
            if (!_.isEmpty(user)) {
                res.send({
                    status: 'error',
                    message: '用户已经存在'
                })
            } else {
                await UserModels.create(body)
                res.send({
                    status: 'success',
                    message: '注册成功'
                })
            }
        } catch (err) {
            console.log(err)
            res.send({
                status: 'error',
                message: '注册失败，请稍后再试'
            })
        }
    };
    async userLogin(req, res, next) { //用户登录
        const body = req.body
        try {
            const user = await UserModels.findOne(body)
            if (user) {
                await UserModels.findOneAndUpdate({
                        _id: user._id
                    }, {
                        $set: {
                            isLogin: true
                        }
                    }),
                    req.session.user = user
                req.session.login = true
                res.send({
                    status: 'success',
                    message: '登录成功'
                })
            } else {
                res.send({
                    status: 'error',
                    message: '用户名或密码错误'
                })
            }
        } catch (err) {
            console.log(err)
            res.send({
                status: 'err',
                message: '登录错误，稍后重试'
            })
        }
    };
    async userLogout(req, res, next) { //用户退出
        await UserModels.updateOne({
            _id: req.session.user._id
        }, {
            $set: {
                isLogin: false
            }
        })
        req.session.user = null
        req.session.login = false
        res.send({
            status: 'success',
            message: '退出成功'
        })
    };
    async userUpdate(req, res, next) { //更新用户信息
        const file = req.file
        const body = req.body
        const userId = body.userId
        const password = body.password
        try {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
                const user = await UserModels.findOne({
                    _id: userId
                })
                console.log(user);
                if (!_.isEmpty(user)) {
                        if (user.password != password) {
                            await UserModels.findOneAndUpdate({
                                _id: userId
                            }, {
                                $set: {
                                    userName: body.userName,
                                    password: body.password,
                                    // tel: body.tel || '',
                                    headPortrait: file.headPortrait || '/public/upload/images/logo.png'
                                }
                            })
                            req.session.user = null
                            req.session.login = false
                            res.send({
                                status: 'success',
                                message: '修改成功，请重新登录'
                            })
                        } else {
                            res.send({
                                status: 'error',
                                message: '新旧密码不能相同，请重新输入'
                            })
                        }

                } else {
                    res.send({
                        status: 'error',
                        message: '输入有误，请重新输入'
                    })
                }
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
                message: '系统繁忙，稍后再试'
            })

        }
    }

}

module.exports = new User()