describe('filter: currency', function() {

  var filter;

  beforeEach(angular.mock.module('formats'));

  beforeEach(inject(function($filter) {
    filter = $filter('currency');
  }));

  it('should convert number and currency code to amount with symbol', function() {
    // phantomJS seems to support toLocaleString options, but it doesn't...
    if (/PhantomJS/.test(window.navigator.userAgent)) {
      expect(filter(10, 'USD')).toEqual('10');
    /* should check result for browsers not supporting toLocaleString options,
      but using same detection method as in filter (not always working anyway) doesn't make much sense */
    } else {
      expect(filter(10, 'USD')).toEqual('$10.00');
    }
  });

});
