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
		console.log(docs);
		docs.forEach(function(elem) {
			var tempobj;
			tempobj = {
				id: elem._id.valueOf(),
				name: elem.name,
				child: []
			}
			response.data.push(tempobj);
		})
	})
}