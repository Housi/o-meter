module.exports = angular.module('oMeter', [])
  .controller('oMeterController', require('./oMeterController'))
  .component('oMeter', require('./oMeterComponent'))
  .service('oMeterService', require('./oMeterService'));
