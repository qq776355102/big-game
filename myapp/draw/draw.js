'use strict';
var request = require('sync-request');
var schedule = require('node-schedule');
var Eos = require('eosjs');

var drawDb = require('../model/biggametransaction/bg.js');




var size = 20;


var draw = {};
draw.get = function (req, res, next) {

    var page = 1666;

    var rule1 = new schedule.RecurrenceRule();
    var times1 = [1, 10, 20, 30, 40, 50];
    rule1.second = times1;
    schedule.scheduleJob(rule1, function () {
        if (page > 2) {
            page--;
        } else {
            page = 1;
        }
        try {

        console.log('page=' + page);
        var res = request('post', 'https://api.eospark.com/api?module=contract&action=get_contract_trx_info&apikey=fa76aba968fd2ab20765903f4afc4cb5&account=eosbiggame55&action_name=draw&page=' + page + '&size=30', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('res='+ JSON.parse(res.body));
        //查合约的动作

        if (JSON.parse(res.body).data.trxs == undefined || JSON.parse(res.body).data.trxs.length == 0) { page = page + 2; } else {
            JSON.parse(res.body).data.trxs.forEach(element => {
                var txid = element.trx_id;
                var transaction_params = { "id": txid, "page_num": 1, "page_size": 100, "interface_name": "get_transaction_action_info" };
                //查交易详情
                var trx_info = request('post', 'https://eospark.com/interface_main?n=get_transaction_action_info', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'referer': 'https://eospark.com/tx/' + txid
                    },
                    body: JSON.stringify(transaction_params)
                });
                console.log('trx_info='+JSON.parse(trx_info.body));
                if (JSON.parse(trx_info.body).data.action_info == null || JSON.parse(trx_info.body).data.action_info == undefined) { page = page + 5; };
                var action_info = JSON.parse(trx_info.body).data.action_info[0];
               // console.log('action_info='+JSON.stringify(action_info));
                if (action_info.inline_action_info != null || action_info.inline_action_info != undefined) {
                    console.log(JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id);
                  //  console.log('inline_action_info='+JSON.stringify(action_info.inline_action_info));
                    drawDb.findOne({
                        where: {
                            game_id: JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id,
                        }
                    }).then(function (ddb) {
                        if (ddb == null) {
                            drawDb.insertOrUpdate({
                                'game_id': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id,
                                'cur_seed': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed,
                                'next_sign': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).next_sign,
                                'black_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card,
                                'black_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card.split("|")[3],
                                'red_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card,
                                'red_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card.split("|")[3],
                                'winner': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.winner,
                                'win_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.win_card_type,
                                'state': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.state,
                                'reveal_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.reveal_at,
                                'created_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.created_at,
                                'page': page
                            });
                        } else if (ddb.next_sign == null || ddb.next_sign == "") {
                            drawDb.update({
                                'cur_seed': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed_hash,
                                'next_sign': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).next_sign,
                                'black_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card,
                                'black_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card.split("|")[3],
                                'red_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card,
                                'red_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card.split("|")[3],
                                'winner': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.winner,
                                'win_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.win_card_type,
                                'state': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.state,
                                'reveal_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.reveal_at,
                                'created_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.created_at,
                                'page': page
                            }, {
                                    where: {
                                        game_id: ddb.game_id
                                    }
                                });
                        };
                    });
                }
                //xunhuan
            })
        }


   //zanshi 
   

            
} catch (error) {
    page = page+5;
}
    })
    
    res.render('index', { title: 'Express' });
}


draw.test = function(){

    var transaction_params = { "id": '01926bba96696a0b4ece05b0463cc302869024eb9378574277258e30bde5a01d', "page_num": 1, "page_size": 100, "interface_name": "get_transaction_action_info" };
    //查交易详情
    var trx_info = request('post', 'https://eospark.com/interface_main?n=get_transaction_action_info', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'referer': 'https://eospark.com/tx/' + '01926bba96696a0b4ece05b0463cc302869024eb9378574277258e30bde5a01d'
        },
        body: JSON.stringify(transaction_params)
    });
    //  console.log(JSON.parse(trx_info.body).data.action_info);
    if (JSON.parse(trx_info.body).data.action_info == null || JSON.parse(trx_info.body).data.action_info == undefined) { page = page + 5; };
    var action_info = JSON.parse(trx_info.body).data.action_info[0];
    // console.log(action_info);
    if (action_info.inline_action_info != null || action_info.inline_action_info != undefined) {
        console.log(JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id);
        drawDb.findOne({
            where: {
                game_id: JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id,
            }
        }).then(function (ddb) {

            if (ddb == null) {
                drawDb.insertOrUpdate({
                    'game_id': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).game_id || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data)._game_item.id,
                    'cur_seed': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed,
                    'next_sign': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).next_sign,
                    'black_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card,
                    'black_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card.split("|")[3],
                    'red_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card,
                    'red_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card.split("|")[3],
                    'winner': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.winner,
                    'win_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.win_card_type,
                    'state': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.state,
                    'reveal_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.reveal_at,
                    'created_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.created_at,
                    'page': page
                });
            } else if (ddb.next_sign == null || ddb.next_sign == "") {
                console.log(true);
                drawDb.update({
                    'cur_seed': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed || JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).cur_seed_hash,
                    'next_sign': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].data).next_sign,
                    'black_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card,
                    'black_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.black_card.split("|")[3],
                    'red_card': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card,
                    'red_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.red_card.split("|")[3],
                    'winner': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.winner,
                    'win_card_type': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.win_card_type,
                    'state': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.state,
                    'reveal_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.reveal_at,
                    'created_at': JSON.parse(JSON.parse(trx_info.body).data.action_info[0].inline_action_info[0].data)._game_item.created_at,
                    'page': page
                }, {
                        where: {
                            game_id: ddb.game_id
                        }
                    });
            };
        });





    }
}







module.exports = draw;