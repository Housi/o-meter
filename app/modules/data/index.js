module.exports = angular.module('data', [])
  .service('dataService', require('./dataService'))
  .controller('dataController', require('./dataController'))
  .component('data', {
    bindings: {
      value: '='
    },
    controller: 'dataController as vm',
  });
