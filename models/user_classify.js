var mongoose = require('./db'),
Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var user_classifySchema = new mongoose.Schema({
	type_id: {
		type: String
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
	save: function(userid, subtype, callback) {
		var user_classify = {
			type_name:subtype.name,
			type_id: subtype._id,
			user_id: userid
		};
		var newclassify = new user_classifyModel(user_classify);
		newclassify.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	},
	getByid:function (userid,callback) {
	    var query = {
			user_id:userid
		}
		this.find(query, function(err, classify) {
			if (err) {
				return callback(err);
			}
			callback(null, classify);
		});
	},
	gettypeid: function(typeid, callback) {
		var query = {
			type_id:typeid
		}
		this.find(query, function(err, users) {
			if (err) {
				return callback(err);
			}
			callback(null, users);
		});
	},
	removebyid:function (userid,subid,callback) {
	    var query = {
	    	user_id:userid,
	    	type_id:subid
	    }
	    this.findOneAndRemove(query,function(err,docs){
	    	console.log(docs);
	    })
	    callback();
	},
	removeAll: function(callback) {
		this.find({}).remove().exec()
		callback();
	}
}
var user_classifyModel = mongoose.model('user_classifys', user_classifySchema);