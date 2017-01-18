var should = require ('should');
var RegRu = require ('../');

var regru = new RegRu('test', 'test');

describe('Check ', function(){
	it("should return result 'success' in JSON at domain check", function(){
		return regru.check('test.ru').then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
})