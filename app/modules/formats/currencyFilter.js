'use strict'

// @ngInject
function currencyFilter() {
  return function(value, currency){
    value = isNaN(value) ? 0.00 : value;
    // should be detecting locale support, according to https://mzl.la/1Ro3xPQ
    if(toLocaleStringSupportsOptions){
      return value.toLocaleString('en', { style: 'currency', currency: currency });
    } else {
      return currencyString(value, currency);
    }
  }

  function toLocaleStringSupportsOptions() {
    return !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
  }

  function currencyString(value, currency){
    if(value > 0) return currency + value.toFixed(2);
    return '-' + currency + (-value.toFixed(2));
  }

}

module.exports = currencyFilter;
