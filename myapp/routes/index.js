var express = require('express');
var draw = require('../draw/draw.js');
var router = express.Router();

var inserttable = require('../tableraw/inserttable.js');


var tableTaws =  require('../tableraw/tableraws.js');



/* GET home page. */
router.get('/index',draw.get
//  function(req, res, next) {

  
//   res.render('index', { title: 'Express' });
// }
);

router.get('/getTableTaws',tableTaws.getTableTaws
//  function(req, res, next) {
//   res.render('index', { title: 'Express' });
// }
);


router.get('/insert',function(req, res, next) {


    inserttable();
  res.render('index', { title: 'Express' });
}
);


module.exports = router;
