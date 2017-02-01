var should = require ('should');
var RegRu = require ('../');
var testdata = require('./testdata.json')

var regru = new RegRu('test', 'test');

describe('Create ', function(){
	it("should return 'success' in JSON at domain create .ru", function(){
		return regru.create("test.ru", testdata.ruDataPerson, 1, '127.0.0.1', ["ns1.staronka.by", "ns2.staronka.by"],false).then(function(res){
			JSON.parse(res).should.have.property('result', 'success');
		}).done();
	})

	it("should return 'success' in JSON at domain create .ru.net", function(){
		return regru.create("test.ru.net", testdata.runetDataPerson, 1, '127.0.0.1', ["ns1.staronka.by", "ns2.staronka.by"], false).then(function(res){
			JSON.parse(res).should.have.property('result', 'success');
		})
	})

	/*it("should return 'success' in JSON at domain create .moscow", function(){
		return regru.create("test.moscow", testdata.moscowDataPerson, 1, '127.0.0.1', ["ns1.staronka.by", "ns2.staronka.by"], false).then(function(res){
			JSON.parse(res).should.have.property('result', 'success');
		})
	})*/

	it("should return 'success' in JSON at domain create .com", function(){
		return regru.create("test.com", testdata.thematicDataPerson, 1, '127.0.0.1', ["ns1.staronka.by", "ns2.staronka.by"],false).then(function(res){
			JSON.parse(res).should.have.property('result', 'success');
		});
	})
	
})