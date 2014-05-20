var mongoose = require('./db');
var Schema = mongoose.Schema;
var actionSchema = new mongoose.Schema({
	subClaId: String,
	classifyid: String,
	subname: String,
	classifyname: String,
	title: String,
	poster: String,
	startDay: String,
	endDay: String,
	endTime: String,
	startTime: String,
	endtime: Number,
	starttime: Number,
	startHHMM: String,
	endHHMM: String,
	time: Number,
	evaluateStatus: Array,
	listscore: [{
		scoreflag: Number,
		userid: String
	}],
	createTime: {
		type: Date,
		default: Date.now
	},
	place: String,
	avgFee: String,
	description: String,
	better: {
		type: Number,
		default: 0
	},
	good: {
		type: Number,
		default: 0
	},
	bad: {
		type: Number,
		default: 0
	},
	sumscore: {
		type: Number,
		default: 0
	},
	peopleNum: {
		type: Number,
		default: 0
	},
	state: {
		type: Boolean,
		default: false
	},
	passState:{
		type: Boolean,
		default:true
	},
	create_userid: String,
	username: String
}, {
	collection: 'actions'
});
actionSchema.methods = {
	addState: function(req) {
		this.evaluateStatus.push(req.session.user.studentId);
		this.peopleNum = this.peopleNum + 1;
		this.save(function(err, res) {
			if (err) {
				return
			}
		});
	},
	addscore: function(req) {
		var obj = {
			scoreflag: req.body.state,
			userid: req.session.user.studentId
		}
		this.listscore.push(obj)
		if (req.body.state == 3) {
			this.better += 1
			this.sumscore += 3
		} else if (req.body.state == 2) {
			this.good += 1
			this.sumscore += 2
		} else {
			this.bad += 1
			this.sumscore += -1
		}
		this.save(function(err, res) {
			if (err) {
				return
			}
		});
	}
}
actionSchema.statics = {
	getByid: function(id, callback) {
		this.findById(id.toString(), function(err, action) {
			if (err) {
				return callback(err);
			}
			callback(null, action);
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
	save: function(action, callback) {
		var newaction = new actionModel(action);
		newaction.save(function(err, res) {
			if (err) {
				return callback(err);
			}
			callback(null, res);
		});
	}
}

var actionModel = mongoose.model('action', actionSchema);