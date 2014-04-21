var mongoose = require('../models/db');
var action = mongoose.model('action');
var classifyModel = mongoose.model('classifys');
var paginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var url = require('url');

var active = [];
var response = {
	ret:true,
	data:[]
}
exports.listAllhot = function(req, res) {
	classifyModel.findAll(function(err, docs) {
		response.data = docs;
		res.send(response);
	})
}

exports.singlelist = function(req,res){
	action.paginate(req.body, 1, 10, function(err, count, docs) {
		response.data = docs
		res.send(response);
	}, {
		sortBy: {
			peopleNum: -1
		}
	});
}

exports.hotaction = function (req,res) {
    action.paginate({}, req.body.pageNum, 3, function(err, count, docs) {
		response.data = docs
		res.send(response);
	}, {
		sortBy: {
			peopleNum: -1
		}
	});
}