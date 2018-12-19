'use strict';
/**
 * 开发环境配置文件
 */
var config = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mysql_config: {
        //mysql数据库配置
        db_name:'test',//数据库名称
        db_user:'root',//数据库使用者名称
        db_password:'123456',//使用者密码
        db_host:'150.109.105.45',//地址
        db_port:'3306',//端口号
        db_prefix:'bg_'//表前缀
    },
    mongodb_config: {
        //mongodb数据库配置
    },
    redis_config: {
        //redis数据库配置
    },

};
module.exports=config;