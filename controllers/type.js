var mongoose = require('../models/db');
var usersModel = mongoose.model('users');
var user_classifyModel = mongoose.model('user_classifys');
var sub_classifyModel = mongoose.model('sub_classifys');
var classifyModel = mongoose.model('classifys');

exports.listAlltype = function(req, res) {
	var response = {
		ret: true,
		nice:1,
		data: []
	};
	classifyModel.findAll(function(err,docs){
		response.data = docs;
		res.send(response);
	})
}

exports.getusertype = function(req,res){
	var response = {
		ret: true,
		nice:1,
		data: []
	};
	console.log(req.body)
	user_classifyModel.getByid(req.body.user_id,function(err,docs){
		response.data = docs;
		res.send(response);
	})
}