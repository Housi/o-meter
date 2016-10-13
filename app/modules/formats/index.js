module.exports = angular.module('formats', [])
  .filter('currency', require('./currencyFilter'));
