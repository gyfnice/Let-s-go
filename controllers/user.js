var mongoose = require('../models/db');
var usersModel = mongoose.model('users');

exports.islogin = function(req, res) {
	var response = {
		ret: true,
		data: {
			data: {
				islogin: true
			}
		}
	};
	if (!req.session.user) {
		response.data.data.islogin = false;
	} else {
		response.data.data = req.session.user;
	}
	res.send(response);

}
exports.logout = function(req, res) {
	req.session.user = null;
	res.send({
		ret: true,
		data: {
			data: {
				islogin: false
			}
		}
	})
}
exports.userlogin = function(req, res) {
	var response = {
		ret: true,
		nice:45,
		info: 7,
		data: []
	};
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
		req.session.user = docs[0];
		response.data = docs;
		res.send(response);
	})
}