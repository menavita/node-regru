var should = require ('should');
var RegRu = require ('../');

var regru = new RegRu('test', 'test');

describe('Renew ', function(){
	it("should return result 'success' in JSON at domain renew", function(){
		return regru.renew('test.ru', 1).then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
})