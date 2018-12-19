'use strict';
//sequelize实例声明
const Sequelize = require('sequelize');
const config = require('../config/config.js');
var mysql_config = config.mysql_config;
var sequelize = new Sequelize(mysql_config.db_name, mysql_config.db_user, mysql_config.db_password, {
    host: mysql_config.db_host,
    dialect: 'mysql',
    pool: {
        max: 500,
        min:60,
        idle: 30000
    }
});
 function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || true;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }

    attrs.game_id = {//强制属性id
        type: Sequelize.INTEGER(50),
        primaryKey: true
        //,//声明主键
       // autoIncrement: true//声明自增
    };

    return sequelize.define(mysql_config.db_prefix + name, attrs, {
        tableName: mysql_config.db_prefix_name,
        timestamps: false
    });
}
module.exports = defineModel;