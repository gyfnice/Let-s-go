var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var sub_classifySchema = new mongoose.Schema({
	name:String,
	sup_id:ObjectId
}, {
	collection: 'sub_classifys'
});

var sub_classifyModel = mongoose.model('sub_classifys', sub_classifySchema);