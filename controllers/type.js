var mongoose = require('../models/db');
var usersModel = mongoose.model('users');
var user_classifyModel = mongoose.model('user_classifys');
var sub_classifyModel = mongoose.model('sub_classifys');
var classifyModel = mongoose.model('classifys');

exports.listAlltype = function(req, res) {
	var response = {
		ret: true,
		data: []
	};
	classifyModel.findAll(function(err, docs) {
		response.data = docs;
		res.send(response);
	})
}

exports.getusertype = function(req, res) {
	var response = {
		ret: true,
		data: []
	};
	user_classifyModel.getByid(req.body.user_id, function(err, docs) {
		response.data = docs;
		res.send(response);
	})
}

exports.addtype = function(req, res) {
	req.body.classifies.forEach(function(elem) {
		sub_classifyModel.getid(elem, function(err, subtype) {
			user_classifyModel.save(req.body.userId, subtype, function(err, docs) {
			})
		})
	});
	req.session.user.tofirst = false;
	usersModel.update({
		studentId: req.session.user.studentId
	}, {
		$set: {
			tofirst: false
		}
	}, function(err, docs) {
	});
	res.send({
		ret: true,
		info: "success"
	});
}

exports.deltype = function(req, res) {
	user_classifyModel.removebyid(req.body.userId, req.body.subClaId, function(err, docs) {
		res.send({
			ret: true,
			info: "删除成功"
		})
	});
}