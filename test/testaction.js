var assert = require("assert");
var mongoose = require('../models/db');
var request = require('supertest');
var app = require('../app');
var actionModel = mongoose.model('action');
var user_actionModel = mongoose.model('user_actions');
var commentModel = mongoose.model('comments');


var action = {
	"classifyId": "5344fb7c8afc98c42184fc0a",
	"subClaId": "5344fb7c8afc98c42184fc0c",
	"title": "123",
	"startDay": "2014-04-11",
	"endDay": "2014-04-11",
	"startHHMM": "18:30",
	"endHHMM": "19:30",
	"place": "testplace",
	"avgFee": 0,
	"description": "12312312",
	"create_userid": "2010083305",
	"username": "gyfnice",
	"poster": "http://localhost:3000/img/uploads/uploadedFileName/crop-23352-6qhd2p.jpg"
}

var actionid;
describe('relate action', function() {
	describe('#operation action by inset,findbyid', function() {
		before(function() {
			actionModel.remove(function() {

			});
		});
		it("should return insert value of title when insert action", function(done) {
			actionModel.save(action, function(err, docs) {
				actionid = docs._id.valueOf();
				assert.equal(123, docs.title);
				done();
			})
		})
		it("find action title by pass getByid", function(done) {
			actionModel.getByid(actionid, function(err, docs) {
				docs.place.should.equal("testplace");
				done();
			})
		})
	});
	after(function(){
		user_actionModel.remove(function(){

		})
		actionModel.remove(function () {

		})
		commentModel.remove(function () {

		})
	})
})