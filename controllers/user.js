var mongoose = require('../models/db');
var usersModel = mongoose.model('users');
var user_actionModel = mongoose.model('user_actions');
var actionModel = mongoose.model('action');
var commentModel = mongoose.model('comments');
var user_actionModel = mongoose.model('user_actions');
var path = require('path');
var fs = require('fs');
var url = require('url');
var gm = require('gm').subClass({
	imageMagick: true
});
var response = {
	ret: true,
	islogin: true,
	data: {

	}
};
exports.islogin = function(req, res) {
	if (!req.session.user) {
		response.islogin = false;
		res.send(response);
	} else {
		usersModel.getByid(req.session.user.studentId, function(err, docs) {
			response.ret = true;
			response.islogin = true;
			req.session.user = docs[0];
			response.data = docs[0];
			res.send(response);
		})
	}

}
exports.logout = function(req, res) {
	req.session.user = null;
	res.send({
		ret: true
	})
}
exports.userinfo = function(req, res) {
	usersModel.getByid(req.body.userId, function(err, docs) {
		response.data = docs[0];
		res.send(response);
	})
}
exports.userlogin = function(req, res) {
	usersModel.getByid(req.body.id, function(err, docs) {
		if (docs.length === 0) {
			response.ret = false;
			response.info = "不存在的账户";
			res.send(response);
			return
		}
		if (req.body.password !== docs[0].password) {
			response.ret = false
			response.info = "你输入的密码错误"
			res.send(response);
			return
		}
		response.ret = true;
		req.session.user = docs[0];
		response.data = docs[0];
		res.send(response);
	})
}
exports.signup = function(req, res) {
	var actionuser = {
		userName: req.session.user.userName,
		headImg: req.session.user.headImg,
		totalScore: req.session.user.totalScore,
		action_id: req.body.action_id,
		studentId: req.session.user.studentId,
		time: new Date().getTime()
	}
	actionModel.getByid(actionuser.action_id, function(err, docs) {
		docs.addState(req);
	});
	user_actionModel.save(actionuser, function(err, docs) {
		res.send({
			ret: true
		})
	})
}
exports.listuser = function(req, res) {
	var query = {
		action_id: req.body.id
	}
	user_actionModel.paginate(query, req.body.page, 7, function(err, count, docs) {
		response.data = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			time: -1
		}
	});
}
exports.listrankuser = function(req, res) {
	usersModel.paginate({}, 1, 7, function(err, count, docs) {
		response.data = docs
		res.send(response);
	}, {
		sortBy: {
			totalScore: -1
		}
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
		.write(newPath + '/headimgs/' + 'crop-' + filename, function() {
			var imgPath = 'crop-' + filename;
			usersModel.update({
				studentId: req.session.user.studentId
			}, {
				$set: {
					headImg: imgPath
				}
			}, function(err, docs) {

			})
			console.log(imgPath);
			commentModel.update({
				userid: req.session.user.studentId
			}, {
				$set: {
					headImg: imgPath
				}
			},{
				multi: true
			}, function(err, docs) {
				console.log(docs)
			})
			user_actionModel.update({
				studentId: req.session.user.studentId
			}, {
				$set: {
					headImg: imgPath
				}
			},{
				multi: true
			}, function(err, docs) {

			})
			res.send({
				ret: true,
				data: imgPath
			})
		});

}