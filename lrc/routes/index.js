var express = require('express');
var router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');

var User = require('../models/Users');
var List = require('../models/Lists');

function auth(req, res, next) {
	//console.log(req.headers);
    var _Token;
    var _Header = req.headers["authorization"];
    if (typeof _Header != 'undefined') {
    	console.log('auth pass');
        var mj = _Header.split(" ");
        _Token = mj[1];
        req.token = _Token;
        next();
    } else {
        console.log('auth failed');
        res.send(403);
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
	User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
		if(err){
			res.json({
				type: false,
				data: "error"
			});
		}else{
			if(user){
				res.json({
					type: true,
					data: user.token
				})
			}else{
				res.json({
					type: true,
					data: "null"
				})
			}
		}
	})
}).post('/api/getSongList', auth, function(req, res){
	var songlist = [];
	User.findOne({token:req.token}, function(err, user){
		List.find({id: {$in:user.list}},{lrc:0}, function(err, list){	
			res.json({
				songlist: list
			})
		})
	});
}).post('/api/getLrc/', auth, function(req, res){
	List.findOne({id:req.body.id},{lrc:1}, function(err, list){
		res.json({
			lrc: list.lrc
		})
	})
}).post('/api/getUsrInfo',auth, function(req, res){
	User.findOne({token: req.token}, function(err, user){
		if(err){
			console.log('signup error');
		}else{
			if(user){
				res.json({
					type: true,
					data: user.username
				});
			}else{
				console.log("null");
			}
			
		}
	})
}).post('/api/signup', function(req, res){
	User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
		if(err){
			console.log('signup error');
		}else{
			if(user){
				res.json({
					type: false,
					data: "User exists!"
				});
			}else{
				var userModel = new User();//'User'
				userModel.username = req.body.username;
				userModel.password = req.body.password;
				userModel.save(function(err, user){
					user.token = jwt.sign(user, 'shhhhh');
                    user.save(function(err, _user) {
                        res.json({
                            type: true,
                            data: _user,
                            token: _user.token
                        });
                    });
				})
			}
		}
	})
});

module.exports = router;
