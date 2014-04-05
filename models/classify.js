var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var ObjectID = require('mongodb').ObjectID;
var classifySchema = new mongoose.Schema({
	name: String,
}, {
	collection: 'classifys'
});

var classifyModel = mongoose.model('classifys', classifySchema);

function Classify(name) {
	this.name = name;
}
module.exports = Classify;
Classify.prototype.save = function(callback,result) {
	var classify = {
		name: this.name
	};
	var newclassify = new classifyModel(classify);
	newclassify.save(function(err,res) {
		if (err) {
			return callback(err);
		}
              console.log(res);
		callback(null,res);
	});
}

Classify.get = function(id, callback) {
	classifyModel.findById(id.toString(),function(err, classify) {
		console.log(id);
		if (err) {
			console.log(12111);
			return callback(err);
		}
		console.log(classify);
		callback(null, classify);
	});
}