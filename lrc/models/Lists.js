var mongoose = require('../config/config');
var Schema = mongoose.Schema;

var List = new Schema({
	id: Number,
	name: String,
	lrc: String
}); 

module.exports = mongoose.model('List', List, 'Lrc');