var assert = require("assert");
var Classify = require('../models/classify.js');
var ObjectID = require('mongodb').ObjectID;
var ClassId = [];

describe('test Type', function() {
	var typeArray = ["运动", "聚会", "娱乐", "文艺", "其它"];
	describe('#insert', function() {
		it('should return null when the value is inserted', function() {
			typeArray.forEach(function(elem) {
				new Classify(elem).save(function(err,result) {
					 ClassId.push(result._id.valueOf());
					 assert.equal(null, err);
				});
			})
		})
	});
	describe('#find',function () {
	    it('should return one result by pass id',function(){
	    	Classify.get(ClassId[0],function(err,res){
	    		assert.equal(res.name,"运动");
	    	});
	    })
	})
})