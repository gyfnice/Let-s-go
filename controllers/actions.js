var Action = require('../models/action');
var path = require('path');
var fs = require('fs');
var url = require('url');
var gm = require('gm').subClass({
	imageMagick: true
});
exports.create = function(req, res) {
	debugger;
}

exports.uploadpic = function(req, res) {

	var me = req;
	cood = req.body;
	var oldpath = req.files.picture.path;
	var newPath = __dirname + "/../src/img/uploads/uploadedFileName";
	var filename = path.basename(oldpath);
	gm(newPath + '/' + filename)
		.crop(cood.picw * (cood.flagPic), cood.pich * (cood.flagPic), cood.picx * (cood.flagPic), cood.picy * (cood.flagPic))
		.write(newPath + '/' + 'crop-' + filename, function() {
			res.redirect("back");
			var imgPath = "http://localhost:3000" + "/img/uploads/uploadedFileName/" + 'crop-' + filename;
			console.log(imgPath);
		});

}