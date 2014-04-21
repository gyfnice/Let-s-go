var mongoose = require('../models/db');
var action = mongoose.model('action');
var classifyModel = mongoose.model('classifys');
var paginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var url = require('url');

var active = [];
exports.listAllhot = function(req, res) {
	classifyModel.findAll(function(err, docs) {
		docs.forEach(function (elem) {
		    elem.addActiveties();
		});
	})
}