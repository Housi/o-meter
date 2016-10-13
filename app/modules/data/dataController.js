'use strict'

// @ngInject
function DataController(dataService){

  var vm = this;

  dataService.get().then(function(){
    vm.value = dataService.data;
  });
}

module.exports = DataController;
