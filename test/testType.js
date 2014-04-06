var assert = require("assert");
var mongoose = require('../models/db');
var request = require('supertest');
var app = require('../app');
var classifyModel = mongoose.model('classifys');
var ObjectID = require('mongodb').ObjectID;
var ClassId = [];

describe('test Type', function() {
	var typeArray = ["运动", "聚会", "娱乐", "文艺", "其它"];
	describe('#insert', function() {
		it('should return null when the value is inserted', function() {
			typeArray.forEach(function(elem) {
				classifyModel.savetype(elem,function(err, result) {
					assert.equal(null, err);
				});
			});
		})
	});
	describe('#findAll', function() {
		it('should delete all result when execute', function() {
			classifyModel.findAll(function(err, docs) {
				docs.length.should.equal(5);
			});
		})
	});
	after(function() {
		classifyModel.remove(function() {
			console.log("clear db");
		});
	})
	/*describe('#find', function() {
		it('should return one result by pass id', function() {
			Classify.getByid(ClassId[0], function(err, res) {
				assert.equal(res.name, "运动");
			});
		})
	});*/
})