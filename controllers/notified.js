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

var response = {
	ret: true,
	data: []
}

exports.allnote = function (req,res) {
	console.log(req.body.id)
    notifiedModel.findAll(req,function (err,docs) {
        res.send({
        	ret:true,
        	length:docs.length,
        	info:docs
        })
    })
}
exports.changeAll = function (req,res) {
	notifiedModel.update({
		studentId: req.body.id
	}, {
		$set: {
			check_status: true
		}
	}, {
		multi: true
	}, function(err, docs) {
		res.send({ret:true});
	})
}
exports.notified = function (req,res) {
	notifiedModel.paginate({
		studentId:req.body.id,
		check_status:false
	}, req.body.page, 10, function(err, count, docs) {
		response.info = docs
		response.pageNum = count;
		res.send(response);
	}, {
		sortBy: {
			createtime: -1
		}
	});
}

exports.read = function (req,res) {
    notifiedModel.getid(req.body.id,function (docs) {
        res.send({
        	ret:true
        })
    })
}