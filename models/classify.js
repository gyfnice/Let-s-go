var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var classifySchema = new mongoose.Schema({
	name: String
}, {
	collection: 'classifys'
});



classifySchema.statics = {
	getByid: function(id, callback) {
		this.findById(id.toString(), function(err, classify) {
			if (err) {
				return callback(err);
			}
			callback(null, classify);
		});
	},
	findAll: function(callback) {
		this.find({}, function(err, docs) {
			if (err) {
				return callback(err);
			}
			callback(null, docs);
		});
	},
	removeAll: function(callback) {
		this.find({}).remove().exec();
		callback();
	},
	savetype: function(name, callback) {
		var classify = {
			name: name
		};
		var newclassify = new classifyModel(classify);
		newclassify.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	}
}

var classifyModel = mongoose.model('classifys', classifySchema);