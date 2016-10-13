var angular = require('angular');

angular.module('dashboard', [
  require('./modules/data').name,
  require('./modules/o-meter').name,
  require('./modules/formats').name,
]);
