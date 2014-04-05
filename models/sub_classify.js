var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var actionSchema = new mongoose.Schema({
	name:String,
	sup_id:ObjectId
}, {
	collection: 'sub_classifys'
});
