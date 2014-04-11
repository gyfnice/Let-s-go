var mongoose = require('../models/db');
var usersModel = mongoose.model('users');
var response = {
	ret: true,
	islogin: true,
	data: {
			
	}
};
exports.islogin = function(req, res) {
	if (!req.session.user) {
		response.islogin = false;
	} else {
		response.data = req.session.user;
		response.islogin = true;
	}
	res.send(response);

}
exports.logout = function(req, res) {
	req.session.user = null;
	res.send({ret:true})
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