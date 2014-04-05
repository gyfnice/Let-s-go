var mongoose = require('./db');
var ObjectId = mongoose.Schema.ObjectId;
var actionSchema = new mongoose.Schema({
	subClaId: String,
	title: String,
	poster: String,
	startDay: String,
	endDay: String,
	startHHMM: String,
	endHHMM: String,
	place: String,
	avgFee: String,
	description: String,
	better:Number,
	good:Number,
	bad:Number,
	sumscore:Number,
	peopleNum:Number,
	state:String,
	userid:ObjectId,
	username:String
}, {
	collection: 'actions'
});

var actionModel = mongoose.model('action', actionSchema);

function Action(actionObj) {
	this.subClaId = actionObj.subClaId;
	this.title = actionObj.title;
	this.startDay = actionObj.startDay;
	this.endDay = actionObj.endDay;
	this.startHHMM = actionObj.startHHMM;
	this.endHHMM = actionObj.endHHMM;
	this.place = actionObj.place;
	this.avgFee = actionObj.avgFee;
	this.description = actionObj.description;
	this.poster = actionObj.poster;
};

Action.prototype.save = function(callback) {
	var action = {
		subClaId: this.subClaId,
		title: this.title,
		startDay: this.startDay,
		endDay: this.endDay,
		startHHMM: this.startHHMM,
		endHHMM: this.endHHMM,
		place: this.place,
		avgFee: this.avgFee,
		description: this.description,
		poster: this.poster
	};
	var newAction = new actionModel(action);
	newAction.save(function(err) {
		if (err) {
			return callback(err);
		}
		callback(null);
	});
};