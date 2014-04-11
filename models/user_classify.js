var mongoose = require('./db'),
Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var user_classifySchema = new mongoose.Schema({
	type_id: {
		type: Schema.Types.ObjectId,
		ref: 'classifys'
	},
	user_id: {
		type: String,
		ref: 'users'
	},
	type_name:String
}, {
	collection: 'user_classifys'
});


user_classifySchema.statics = {
	save: function(user, subtype, callback) {
		var user_classify = {
			type_name:subtype.name,
			sub_id: subtype._id,
			user_id: user.studentId
		};
		var newclassify = new user_classifyModel(user_classify);
		newclassify.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	},
	getByid: function(userid, callback) {
		var query = {
			user_id:userid
		}
		console.log(userid);
		this.find(query, function(err, classify) {
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
var user_classifyModel = mongoose.model('user_classifys', user_classifySchema);