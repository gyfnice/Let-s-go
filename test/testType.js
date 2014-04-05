var assert = require("assert");
var Classify = require('../models/classify.js');
var ObjectID = require('mongodb').ObjectID;
var ClassId = [];

describe('test Type', function() {
	var typeArray = ["运动"];
	describe('#insert', function() {
		it('should return null when the value is inserted', function(done) {
			typeArray.forEach(function(elem) {
				new Classify(elem).save(function(err,result) {

          	    	              Classify.get(result._id,function(err,res){
	    		                       assert.equal(res.name,"运动");
                                   });
				});
			})
                     done();
		})
	});
	/*describe('#find',function () {
	    it('should return one result by pass id',function(done){
	    	Classify.get(ClassId[0],function(err,res){
	    		assert.equal(res.name,"运动");
	    	});
              done();
	    })
	})*/
})