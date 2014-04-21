var mongoose = require('./db');
var Schema = mongoose.Schema;
var action = mongoose.model('action');
var paginate = require('mongoose-paginate');
var classifySchema = new mongoose.Schema({
	name: String,
	id: Schema.Types.ObjectId,
	child: [{
		subName: String,
		id: String
	}],
	activities: [{
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
	}]
}, {
	collection: 'classifys'
});

classifySchema.methods = {
	addChild: function(subtype) {
		this.child.push({
			subName: subtype.name,
			id: subtype._id
		});
		this.id = this._id;
		this.save(function(err, res) {
			if (err) {
				return
			}
		});
	},
	addActiveties: function() {
		var id = this.id;
		var me = this;
		action.paginate({
			classifyid: id
		}, 1, 4, function(err, count, docs) {
			me.activities = docs;
			me.save(function(err, res) {
				if (err) {
					return
				}
			});
		}, {
			sortBy: {
				peopleNum: -1
			}
		});
	}
}

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