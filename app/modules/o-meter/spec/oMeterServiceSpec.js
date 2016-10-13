'use strict'

describe('service: oMeterService', function(){

    beforeEach(angular.mock.module('oMeter'));

    var oMeterService;

    beforeEach(inject(function(_oMeterService_){
     oMeterService = _oMeterService_;
    }));

    it('should correctly calculate needle angle', function() {
     var angle = oMeterService.getAngle(100, 500, 300);
     expect(angle).toBe(90);
    });

    it('should correctly calculate arc end coordinates', function() {
     var arcEnd = oMeterService.getArcEnd(100, 0, 10, 180);
     expect(arcEnd).toEqual({ x: 110, y: 0 });
    });

    it('should return unchanged value if specified filter doesnt exist', function() {
     var value = 1000;
     var formatted = oMeterService.format(value, 'magic');
     expect(formatted).toEqual(value);
    });

    it('should validate valid data', function() {
      var valid = oMeterService.validate({ min: 100, max: 800, value: 500 });
      expect(valid).toBe(true);
    });

    it('should\'nt validate invalid data', function() {
      var valid = oMeterService.validate({ min: 100, max: 80, value: 500 });
      expect(valid).toBe(false);
    });

});
