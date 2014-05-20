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
	classifyModel.find({}).sort({
		premium: 1
	}).exec(function(err, docs) {
		response.data = docs;
		res.send(response);
	});
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
exports.addsubtype = function (req,res) {
	console.log(req.body.id)
	classifyModel.getByid(req.body.id, function(err, docs) {
		sub_classifyModel.find({
			state:true,
			name:req.body.sid
		},function (err,sdocs) {
		    if(sdocs.length >=1){
				res.send({ret:false})
				return
			}
			sub_classifyModel.save(req.body.sid, docs, function(err, docs) {
				if (err) {
					return
				}
				res.send({
					ret: true
				})
			});
		})
	});
	
}
exports.delsubtype = function(req, res) {
	classifyModel.getByid(req.body.id, function(err, docs) {
			sub_classifyModel.find({
					state: true,
					name: req.body.sid
				}, function(err, sdocs) {
					if (sdocs.length === 0) {
						res.send({
							ret: false
						})
						return
					}
					docs.child.forEach(function(elem) {
						if (elem.subName === req.body.sid) {
							elem.state = false;
						}
					})
					sub_classifyModel.update({
						name: req.body.sid
					}, {
						$set: {
							state: false
						}
					}, {
						multi: true
					}, function(err, docs) {

					})
					docs.save(function(err, docs) {
						console.log(docs)
						res.send({
							ret: true
						})
					})
		})
        
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