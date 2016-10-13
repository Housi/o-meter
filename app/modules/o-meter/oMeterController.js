'use strict'

// @ngInject
function oMeterController(oMeterService){

  var vm = this;
  vm.$onChanges = onChanges;
  vm.format = oMeterService.format;

  function onChanges(changes) {
    var data = changes.data.currentValue;
    if(data){
      if(oMeterService.validate(data)){
        vm.rotation = oMeterService.getAngle(data.min, data.max, data.value);
        vm.coords = oMeterService.getArcEnd(500, 900, 400, vm.rotation);
      } else {
        vm.error = true;
      }
    }
  }

}

module.exports = oMeterController;
