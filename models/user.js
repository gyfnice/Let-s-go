var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var usersSchema = new mongoose.Schema({
	userName: String,
	password:String,
	studentId: String,
	role: {
		type: String,
		default: "custom"
	},
	headImg: {
		type:String,
		default:"defaulthead.jpg"
	},
	email: String,
	tofirst:{
		type:Boolean,
		default:true
	},
	totalScore: {
		type: Number,
		default: 0
	}
}, {
	collection: 'users'
});

usersSchema.statics = {
	save: function(users, callback) {
		var newuser = new usersModel(users);
		newuser.password = users.studentId;
		newuser.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	},
	saveadmin:function(users, callback) {
		var newuser = new usersModel(users);
		usersModel.getByid(users.studentId, function(err, docs) {
			if (docs.length === 0) {
				newuser.save(function(err, res) {
					if (err) {
						return callback(err);
					}
					callback(true, res);
				});
			}else{
				callback(false);
			}
		})
		
	},
	getByid: function(studentId, callback) {
		var query = {
			studentId: studentId
		}
		this.find(query, function(err, userinfo) {
			if (err) {
				return callback(err);
			}
			callback(null, userinfo);
		});
	},
	removeAll: function(callback) {
		this.find({}).remove().exec();
		callback();
	}
}
var usersModel = mongoose.model('users', usersSchema);