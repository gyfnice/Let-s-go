var mongoose = require('./db');
var Schema = mongoose.Schema;
var commentSchema = new mongoose.Schema({
	headImg:String,
	userName:String,
	commentDate:String,
	commentTime:String,
	time:Number,
	createTime:{
		type:Date,
		default:Date.now()
	},
	content:String,
	actionid:String,
	userid:String
}, {
	collection: 'comments'
});

commentSchema.methods = {
	addChild:function(subtype){
		this.child.push({
			subName:subtype.name,
			id:subtype._id
		});
		this.id = this._id;
		this.save(function(err,res){
			if(err){
				return
			}
		});
	}
}

commentSchema.statics = {
	getByid: function(id, callback) {
		var query = {
			actionid:id
		}
		this.find(query, function(err, comment) {
			if (err) {
				return callback(err);
			}
			callback(null, comment);
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
	savetype: function(comment, callback) {
		var newcomment = new commentModel(comment);
		newcomment.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	}
}

var commentModel = mongoose.model('comments', commentSchema);