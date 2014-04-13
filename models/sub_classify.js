var mongoose = require('./db'),
Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var sub_classifySchema = new mongoose.Schema({
	name: String,
	sup_id: {
		type: Schema.Types.ObjectId,
		ref: 'classifys'
	},
	sup_name: {
		type: String,
		ref: 'classifys'
	}
}, {
	collection: 'sub_classifys'
});

sub_classifySchema.statics = {
	save: function(name, suptype, callback) {
		var sub_classify = {
			name: name,
			sup_id: suptype._id,
			sup_name: suptype.name
		};
		var newclassify = new sub_classifyModel(sub_classify);
		newclassify.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			suptype.addChild(res);
			callback(null, res);
		});
	},
	getByid: function(supid, callback) {
		var query = {
			sup_id:supid.toString()
		}
		this.find(query, function(err, classify) {
			if (err) {
				return callback(err);
			}
			callback(null, classify);
		});
	},
	getid:function(id,callback) {
		this.findById(id.toString(), function(err, classify) {
			if (err) {
				return callback(err);
			}
			callback(null, classify);
		});
	},
	removeAll: function(callback) {
		this.find({}).remove().exec();
		callback();
	}
}
var sub_classifyModel = mongoose.model('sub_classifys', sub_classifySchema);