'use strict'

// @ngInject
function dataService($http, $q) {

  var dataService = this;
  dataService.get = get;

  function get() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://widgister.herokuapp.com/challenge/frontend' // this shouldnt be hardcoded here in real app
    })
    .then(function(response) {
      dataService.data = response.data;
      deferred.resolve(dataService.data);
    }, function(err){
      deferred.reject();
    });
    return deferred.promise;
  }
}

module.exports = dataService;
