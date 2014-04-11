var mongoose = require('../models/db');
var action = mongoose.model('action');
var path = require('path');
var fs = require('fs');
var url = require('url');
var gm = require('gm').subClass({
	imageMagick: true
});
exports.create = function(req, res) {
	console.log(req.body);
	action.save(req.body, function(err, docs) {
		console.log(err)
		console.log(docs)
		res.send({
			info: "活动添加成功",
			ret: true
		})
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