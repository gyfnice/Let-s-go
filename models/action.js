var mongoose = require('./db');
var Schema = mongoose.Schema;
var actionSchema = new mongoose.Schema({
	subClaId: String,
	title: String,
	poster: String,
	startDay: String,
	endDay: String,
	startHHMM: String,
	endHHMM: String,
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
	create_userid: String,
	username: String
}, {
	collection: 'actions'
});

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