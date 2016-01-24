var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res){
 	res.sendFile(path.join(__dirname, '../app', 'index.html'));
}).get('/main/*', function(req, res){
	console.log(req.path);
 	res.redirect("/#"+req.path);
});

module.exports = router;
