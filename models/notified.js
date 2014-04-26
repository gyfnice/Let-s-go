var mongoose = require('./db');
var Schema = mongoose.Schema;
var notifiedSchema = new mongoose.Schema({
	type:String,
	studentId:String,
	content:String,
	check_status:{
		type:Boolean,
		default:false
	},
	createtime:{
		type:Date,
		default:Date.now()
	}
}, {
	collection: 'notifieds'
});


notifiedSchema.methods = {
	changestate:function(){
		this.check_status = true;
		this.save(function(err, res) {
			if (err) {
				return
			}
		});
	}
}
notifiedSchema.statics = {
	getByid: function(id, callback) {
		var query = {
			studentId:id
		}
		this.find(query, function(err, notified) {
			if (err) {
				return callback(err);
			}
			callback(null, notified);
		});
	},
	getid:function (id,callback) {
	    this.findById(id, function(err, docs) {
			if (err) {
				return callback(err);
			}
			docs.changestate();
			callback(docs);
		});
	},
	findAll: function(req,callback) {
		this.find({
			studentId:req.body.id,
			check_status:false
		}, function(err, docs) {
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
	savetype: function(notified, callback) {
		var newnotified = new notifiedModel(notified);
		newnotified.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	}
}

var notifiedModel = mongoose.model('notifieds', notifiedSchema);