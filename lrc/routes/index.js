var express = require('express');
var router = express.Router();
var path = require('path');

function auth(req, res, next) {
	console.log(req.headers);
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != 'undefined') {
    	console.log('auth pass');
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
    	//next();
        res.send(403);
        console.log('auth failed');
        //res.redirect('/');
    }
}

/* GET home page. */
router.get('/', function(req, res){
 	res.sendFile(path.join(__dirname, '../app', 'index.html'));
}).get('/login', function(req, res){
	res.sendFile(path.join(__dirname, '../app', 'index.html'));
}).get('/main/*', function(req, res){
	res.redirect("/#"+req.path);
}).post('/api/login', function(req, res){
	if(req.body.username == "admin" && req.body.password == "admin" ){
		return res.json({
			type: true,
			username: "admin",
			token: "qwertyu"
		})
	}else{
		return res.json({
			type: false,
			text: "error"
		})
	}
}).post('/api/getSongList', auth, function(req, res){
	return res.json(
				{songlist:[{
								'id':1,
								'name':"Cras justo odio"
							},{
								'id':2,
								'name':"Cras justo odio"
							},{
								'id':3,
								'name':"Cras justo odio"
							},{
								'id':4,
								'name':"Cras justo odio"
							},{
								'id':5,
								'name':"Cras justo odio"
							},{
								'id':6,
								'name':"Cras justo odio"
							},{
								'id':7,
								'name':"Cras justo odio"
							},{
								'id':8,
								'name':"Cras justo odio"
							}]}
			);
}).post('/api/getLrc', auth, function(req, res){
	return res.json({
		lrc:"aisudghisahlasgdflhgsaiufhsildf"
	});
}).post('/api/getUsrInfo',auth,function(req, res){
	if(req.token){
		return res.json({
			username: 'ypwlal'
		});
	}
});

module.exports = router;
