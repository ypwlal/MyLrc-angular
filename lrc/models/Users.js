var mongoose = require('../config/config');
var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	password: String,
	list: Array,
	token: String
}); 

module.exports = mongoose.model('User', User, 'User');
