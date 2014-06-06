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
		var testuser = {
			studentId: "nice",
			userName: "我是测试",
			role: "custom",
			email: "out@qq.com"
		}
		it("should return null when insert users", function(done) {
			usersModel.save(testuser, function(err, docs) {
				user = docs;
				userid = user._id.valueOf();
				assert.equal(null, err);
				done();
			})
		})
	});
})