const mongoose = require('mongoose')

//连接数据库，如果没有domo会自动创建一个domo数据库
const URL = 'mongodb://localhost:27017/demo'

exports.connect = function(){
    mongoose.connect(URL,function(err){
        if(err){
            console.log("数据库连接错误："+err);
        }else{
            console.log("数据库连接成功!!!");
        }
    })
    
}