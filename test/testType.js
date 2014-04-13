var assert = require("assert");
var mongoose = require('../models/db');
var request = require('supertest');
var app = require('../app');
var classifyModel = mongoose.model('classifys');
var sub_classifyModel = mongoose.model('sub_classifys');

var ClassId = [];

describe('test Type', function() {
	before(function() {
		classifyModel.remove(function() {
			console.log();
		});
		sub_classifyModel.remove(function(){
			console.log();
		});
	})
	var typeArray = ["运动", "聚会", "娱乐", "文艺", "其它"];
	describe('#insert', function() {
		var elemid;
		it('should return null when the value is inserted', function(done) {
			classifyModel.savetype("运动",function(err, result) {
				elemid = result._id.valueOf();
				assert.equal(null, err);
				done();
			});
		})
		it('should return one result by pass id',function(done){
			classifyModel.getByid(elemid,function(err,res){
				res.name.should.equal("运动");
				done();
			});
		})
	});
	describe('#findAll', function() {
		it('should delete all result when execute', function() {
			classifyModel.findAll(function(err, docs) {
				docs.length.should.equal(1);
			});
		})
	});
	after(function() {
		classifyModel.remove(function(){})
	})
})

describe('test sub_Type', function() {
	var supid;
	var sub_typeArray = ["篮球", "足球", "羽毛球", "兵乓球", "游泳","台球","瑜伽"];
	var h_array = ["聚餐","ktv","交友","踏青"]
	describe('#insert', function() {
		it('should return null when the value is inserted', function(done) {
			classifyModel.savetype("运动",function(err,res){
				supid = res._id.valueOf();
				sub_typeArray.forEach(function(elem){
					sub_classifyModel.save(elem,res,function(err,docs){
						if(err){
							return
						}
						assert.equal(err,null);
					});
				});
				done();
			});
		})
		it('should return null when the value is inserted', function(done) {
			classifyModel.savetype("聚会",function(err,res){
				h_array.forEach(function(elem){
					sub_classifyModel.save(elem,res,function(err,docs){
						if(err){
							return
						}
						assert.equal(err,null);
					});
				});
				done();
			});
		})
	});
	describe('#find subtype by superid', function() {
		it('should return all subtype in supertype', function(done) {
			sub_classifyModel.getByid(supid,function(err, docs) {
				docs.length.should.equal(sub_typeArray.length);
				done();
			});
		})
		it('should return supertype child as Array',function (done) {
		    classifyModel.getByid(supid,function(err,res){
		    	res.child.length.should.equal(sub_typeArray.length);
				done();
			});
		})
	});
	/*
	describe('#findbyid',function(){
		it('should return one result by pass id',function(){
			classifyModel.getByid(ClassId[0],function(err,res){
				res.name.should.equal("运动");
			});
		})
	})
	after(function() {
		classifyModel.remove(function() {
			console.log("clear db");
		});
	})*/
})