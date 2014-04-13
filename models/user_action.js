var mongoose = require('./db'),
Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var user_actionSchema = new mongoose.Schema({
	time:Number,
	action_id: {
		type: String,
		ref:"action"
	},
	studentId: {
		type: String
	},
	userName :String,
	totalScore:Number,
	headImg:String
}, {
	collection: 'user_actions'
});


user_actionSchema.statics = {
	save: function(uaction, callback) {
		var newuaction = new user_actionModel(uaction);
		newuaction.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	},
	getByid: function(actionid, callback) {
		var query = {
			action_id:actionid
		}
		this.find(query, function(err, classify) {
			if (err) {
				return callback(err);
			}
			callback(null, classify);
		});
	},
	removebyid:function (userid,subid,callback) {
	    var query = {
	    	user_id:userid,
	    	type_id:subid
	    }
	    console.log(query);
	    this.findOneAndRemove(query,function(err,docs){
	    	console.log(docs);
	    })
	    callback();
	},
	removeAll: function(callback) {
		this.find({}).remove().exec();
		callback();
	}
}
var user_actionModel = mongoose.model('user_actions', user_actionSchema);