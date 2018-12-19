'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb=require('../../db/db.js');
var attr={//填充额外属性
    game_id:Sequelize.INTEGER(11),
    black_card:Sequelize.STRING(65),
    black_card_type:Sequelize.INTEGER(11),
    red_card:Sequelize.STRING(65),
    red_card_type:Sequelize.INTEGER(11),
    winner:Sequelize.INTEGER(11),
    win_card_type:Sequelize.INTEGER(11),
    state:Sequelize.INTEGER(11),
    reveal_at:Sequelize.STRING(65),
    created_at:Sequelize.STRING(65)
}


var db_bg= definddb('draws',attr);
module.exports=db_bg;