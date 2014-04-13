var mongoose = require('../models/db');
var action = mongoose.model('action');
var usersModel = mongoose.model('users');
var commentModel = mongoose.model('comments');
var paginate = require('mongoose-paginate');
var path = require('path');
var response = {
	ret: true,
	data: []
}
function getDateTime() {

	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var sec = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return {
		date:year + "-" + month + "-" + day,
		time:hour + ":" + min + ":" + sec,
		timenum:date.getTime()
	}
}

exports.listmessage = function(req, res) {
    var query = {
		actionid: req.body.id
	}
	commentModel.paginate(query, req.body.page, 10, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	},{
		sortBy:{
			time:-1
		}
	});
}

exports.addmessage = function(req, res) {
	var ctime = getDateTime();
	var comment = {};
	comment = req.body;
	comment.commentDate = ctime.date;
	comment.commentTime = ctime.time;
	comment.headImg = req.session.user.headImg;
	comment.userName = req.session.user.userName;
	comment.time = ctime.timenum;
	commentModel.savetype(comment, function(err,docs){
		console.log(docs)
		res.send({ret:true,info:"success"});
	})
}