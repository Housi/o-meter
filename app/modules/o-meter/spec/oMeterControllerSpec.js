'use strict'

describe('component: oMeter', function() {

  beforeEach(angular.mock.module('oMeter'));

  var $componentController;

  beforeEach(inject(function(_$componentController_){
    $componentController = _$componentController_;
  }));

  it('should correctly set angle on changes', function() {
    var component = $componentController('oMeter');
    var data = { min: 100, max: 500, value: 300 };
    component.$onChanges({ data: { currentValue: data }});
    expect(component.rotation).toBe(90);
  });

});
