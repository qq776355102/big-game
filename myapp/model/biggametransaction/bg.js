'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb=require('../../db/db.js');
var attr={//填充额外属性
    game_id:Sequelize.INTEGER(11),
    cur_seed:Sequelize.STRING(100),
    next_sign:Sequelize.STRING(300),
    black_card:Sequelize.STRING(65),
    black_card_type:Sequelize.INTEGER(11),
    red_card:Sequelize.STRING(65),
    red_card_type:Sequelize.INTEGER(11),
    winner:Sequelize.INTEGER(11),
    win_card_type:Sequelize.INTEGER(11),
    state:Sequelize.INTEGER(11),
    reveal_at:Sequelize.STRING(65),
    created_at:Sequelize.STRING(65),
    page:Sequelize.INTEGER(11)
}

var db_bg= definddb('trans',attr);

module.exports=db_bg;