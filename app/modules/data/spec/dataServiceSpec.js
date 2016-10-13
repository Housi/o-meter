'use strict'

describe('service: dataService', function(){

   beforeEach(angular.mock.module('data'));

   var dataService, $httpBackend;

   beforeEach(inject(function(_dataService_, _$httpBackend_){
     dataService = _dataService_;
     $httpBackend = _$httpBackend_;
   }));

   it('should get data', function() {
     $httpBackend.expect('GET', 'https://widgister.herokuapp.com/challenge/frontend').respond(200);
     dataService.get();
     expect($httpBackend.flush).not.toThrow();
   });

});
