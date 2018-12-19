var request = require('sync-request');




var tableTaws = {};

tableTaws.getTableTaws = function (req, res, next) {
    var page = 53641;

    var url = "https://eosx-apigw.eosx.io/api/contracts/eosbiggame55/tables/gamelist?tableKey=id&scope=eosbiggame55&lowerBound="+page+"&limit=100";
  //  var requestData = "上送的数据";
    var rs = request('GET','https://eosx-apigw.eosx.io/api/contracts/eosbiggame55/tables/gamelist?tableKey=id&scope=eosbiggame55&lowerBound=54132&limit=1000',{
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "referer": "https://www.eosx.io/account/eosbiggame55?mode=contract&sub=tables&table=gamelist&lowerBound=&upperBound=&limit=100&scope=eosbiggame55",

        }
    });
    
    console.log(rs.body.toString());

    res.render('index', { title: 'Express' });
}


module.exports = tableTaws;