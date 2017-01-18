var should = require ('should');
var RegRu = require ('../');

var regru = new RegRu('test', 'test');

describe('Get prices ', function(){
	it("should return result 'success' in JSON at get RUR prices", function(){
		return regru.getPrices('RUR').then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
	it("should return result 'success' in JSON at get USD prices", function(){
		return regru.getPrices('USD').then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
	it("should return result 'success' in JSON at get USD prices", function(){
		return regru.getPrices('EUR').then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
	it("should return result 'success' in JSON at get UAH prices", function(){
		return regru.getPrices('UAH').then(function(res){ 
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
})