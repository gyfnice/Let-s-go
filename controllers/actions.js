var mongoose = require('../models/db');
var action = mongoose.model('action');
var usersModel = mongoose.model('users');
var paginate = require('mongoose-paginate');
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
	action.save(req.body, function(err, docs) {
		console.log(err)
		console.log(docs)
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
	console.log(req.body.keywords)
	var query = {
		$or: [{
			title: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}, {
			place: new RegExp(decodeURIComponent(req.body.keywords), "i")
		}, {
			description: new RegExp(decodeURIComponent(req.body.keywords), "i")
		},{
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
			time: -1,
			place: 1
		}
	});
}
exports.searchbyid = function(req, res) {
	console.log(req.body)
	var timearray = req.body.dayStr.split(",");
	console.log(new Date(timearray[0]).getTime())
	console.log(timearray[timearray.length - 1]);
	console.log(new Date(timearray[timearray.length - 1]).getTime())
	if (timearray.length === 1) {
		console.log(122229);
		var query = {
			startDay: timearray[0].replace(/\//g, "-")
		}

	} else {
		console.log(8);
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
exports.lookpublish = function(req, res) {
	var query = {
		create_userid: req.body.id
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