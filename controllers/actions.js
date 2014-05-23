var mongoose = require('../models/db');
var action = mongoose.model('action');
var classifyModel = mongoose.model('classifys');
var usersModel = mongoose.model('users');
var paginate = require('mongoose-paginate');
var notifiedModel = mongoose.model('notifieds');
var user_classifyModel = mongoose.model('user_classifys');
var path = require('path');
var fs = require('fs');
var url = require('url');
var gm = require('gm').subClass({
	imageMagick: true
});
var response = {
	ret: true,
	data: []
}
exports.create = function(req, res) {
	req.body.time = new Date().getTime();
	req.body.endTime = req.body.endDay + " " + req.body.endHHMM;
	req.body.startTime = req.body.startDay + " " + req.body.startHHMM;
	req.body.starttime = new Date(req.body.startTime).getTime();
	req.body.endtime = new Date(req.body.endTime).getTime();
	action.save(req.body, function(err, docs) {
		res.send({
			info: "活动添加成功",
			ret: true
		})
	});

}
exports.list = function(req, res) {
	action.getByid(req.body.id, function(err, docs) {
		response.data = docs;
		res.send(response);
	});
}
exports.uploadpic = function(req, res) {
	var me = req;
	cood = req.body;
	var oldpath = req.files.picture.path;
	var newPath = __dirname + "/../src/img/uploads/uploadedFileName";
	var filename = path.basename(oldpath);
	gm(newPath + '/' + filename)
		.crop(cood.picw * (cood.flagPic), cood.pich * (cood.flagPic), cood.picx * (cood.flagPic), cood.picy * (cood.flagPic))
		.write(newPath + '/posters/' + 'crop-' + filename, function() {
			var imgPath = 'crop-' + filename;
			res.send({
				res: true,
				data: imgPath
			})
		});

}
exports.searchbykey = function(req, res) {
	var query = {
		state: true,
		passState:true,
		$or: [{
			title: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}, {
			place: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}, {
			description: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}, {
			username: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}]
	}
	action.paginate(query, req.body.page, 10, function(err, count, docs) {
		response.data = docs
		response.totalPage = count;
		res.send(response);
	}, {
		sortBy: {
			title: 1,
			description: 1,
			peopleNum: -1,
			place: 1
		}
	});
}
exports.searchbyid = function(req, res) {
	var timearray = req.body.dayStr.split(",");
	if (timearray.length === 1) {
		var query = {
			startDay: timearray[0].replace(/\//g, "-")
		}

	} else {
		var query = {
			time: {
				"$gte": new Date(timearray[0]).getTime(),
				"$lte": new Date(timearray[timearray.length - 1]).getTime()
			}
		}
	}

	if (req.body.id) {
		query.classifyid = req.body.id
	} else {
		query.subClaId = req.body.sid
	}
	query.state = true
	query.passState = true
	action.paginate(query, req.body.page, 10, function(err, count, docs) {
		response.data = docs
		response.totalPage = count;
		res.send(response);
	}, {
		sortBy: {
			time: -1
		}
	});
}

exports.enrolleduser = function(req, res) {
	var query = {
		evaluateStatus: req.body.id,
		endtime: {
			$gt: Date.now()
		},
		state: true
	}
	action.paginate(query, req.body.page, 4, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			starttime: 1
		}
	});
}
exports.joinedaction = function(req, res) {
	var query = {
		evaluateStatus: req.body.id,
		endtime: {
			$lt: Date.now()
		},
		state: true,
		passState:true
	}
	action.paginate(query, req.body.page, 4, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			endtime: 1
		}
	});
}
exports.lookpublish = function(req, res) {
	var query = {
		create_userid: req.body.id,
		state: true,
		passState:true
	}
	action.paginate(query, req.body.page, 4, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			createTime: -1
		}
	});

}

exports.countnum = function(req, res) {
	var query = {
		state: false
	}
	action.find(query, function(err, docs) {
		response.examnum = docs.length;
		res.send(response);
	});
}

exports.actionlist = function(req, res) {
	action.paginate(req.body.query, req.body.page, 7, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			createTime: -1
		}
	});
}

exports.updateState = function(req, res) {
	action.find({
		_id: req.body.aid
	}, function(err, docs) {
		docs[0].state = true
		docs[0].passState = req.body.state
		docs[0].save(function(err, docs) {
			if (docs.passState === true) {
				usersModel.update({
					studentId: docs.create_userid
				}, {
					$inc: {
						totalScore: 1
					}
				}, function(err, docs) {
					res.send({
						ret: true
					})
				})
				user_classifyModel.gettypeid(docs.subClaId, function(err, udocs) {
					udocs.forEach(function(elem) {
						var str = '你关注的<a href="#">' + elem.type_name + '</a>有新的<a target="_blank" href="action-info.html?actionid=' + docs._id + '" title="' + docs.title + '" target="_blank">活动</a>发布啦';
						var note = {
							type: "活动分类",
							studentId: elem.user_id,
							content: str
						}
						notifiedModel.savetype(note, function(err, docs) {
							console.log(docs);
						})
					})
				})
				classifyModel.findAll(function(err, docs) {
					docs.forEach(function(elem) {
						console.log(81)
						elem.addActiveties();
					});
				})
			}
		})
		res.send({
			ret: true
		});
	})
}