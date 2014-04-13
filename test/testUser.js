var assert = require("assert");
var mongoose = require('../models/db');
var request = require('supertest');
var app = require('../app');
var usersModel = mongoose.model('users');
var user_classifyModel = mongoose.model('user_classifys');
var sub_classifyModel = mongoose.model('sub_classifys');
var classifyModel = mongoose.model('classifys');

var user;
var userid;

describe('relate users', function() {
	describe('#userinfo', function() {
		var gyfnice = {
			studentId: "2010083305",
			userName: "gyfnice",
			role: "custom",
			email: "gyfnice@qq.com"
		}
		var gyfvane = {
			studentId: "123",
			userName: "gyfvane",
			role: "custom",
			email: "gyfnice@qq.com"
		}
		before(function() {
			usersModel.remove(function() {

			});
			user_classifyModel.remove(function() {

			});
		});
		it("should return null when insert users", function(done) {
			usersModel.save(gyfnice, function(err, docs) {
				user = docs;
				userid = user._id.valueOf();
				assert.equal(null, err);
				done();
			})
			usersModel.save(gyfvane, function(err, docs) {
				assert.equal(null, err);
			})
		})
		it("find user info by pass userid", function(done) {
			usersModel.getByid(user.studentId, function(err, docs) {
				docs[0].userName.should.equal("gyfnice");
				docs[0].role.should.equal("custom");
				done();
			})
		})
	});
	describe('#user_classifys', function() {
		var classtype;
		var sub_length;
		/*it("should insert one doc when exec", function(done) {
			classifyModel.findAll(function(err, docs) {
				classtype = docs[0];
				sub_classifyModel.getByid(classtype._id.valueOf(), function(err, docs) {
					sub_length = docs.length;
					docs.forEach(function(elem) {
						user_classifyModel.save(user.studentId, elem, function(err, res) {
							assert.equal(err, null);
						})
					})
					done();
				})
			});

		})

		it("should find result sum_count by pass userid",function (done) {
		    user_classifyModel.getByid(user.studentId,function (err,docs) {
		        docs.length.should.equal(sub_length);
		        done();
		    })
		})*/
	})
})