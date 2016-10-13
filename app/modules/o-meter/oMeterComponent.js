module.exports = {
  bindings: {
    data: '<'
  },
  controller: 'oMeterController as vm',
  template:
    '<div class="o-meter o-meter__error" ng-if="vm.error"> Sorry, can\'t plot this data </div>' +
    '<svg class="o-meter" ng-if="!vm.error" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin meet">' +
      '<defs>'+
        '<linearGradient id="o-meter__gradient" gradientUnits="userSpaceOnUse" x1="100" y1="900" x2="900" y2="900">' +
          '<stop class="o-meter__gradient__start" offset="0%"/>' +
          '<stop class="o-meter__gradient__end" offset="100%" />' +
        '</linearGradient>' +
        '<filter id="o-meter__glow" x="-120%" y="-120%" width="400%" height="400%">' +
          '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset>' +
          '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur>' +
          '<feBlend in="SourceGraphic" in2="blurOut" mode="multiply"></feBlend>' +
        '</filter>' +
      '</defs>' +
      '<text class="o-meter__text o-meter__text--main" y="250" x="500">{{ vm.format(vm.data.value, vm.data.format, vm.data.unit) }}</text>' +
      '<path class="o-meter__guides" d="M 50 900 A 400 400 0 0 1 950 900"></path>' +
      '<path class="o-meter__value" ng-attr-d="M 100 900 A 400 400 0 0 1 {{ vm.coords.x }} {{ vm.coords.y }}"></path>' +
      '<line class="o-meter__needle" id="o-meter__needle" y2="900" x2="0" y1="900" x1="490" ng-attr-transform="rotate({{ vm.rotation }}, 500, 900)"" />' +
      '<circle class="o-meter__needle__pin" cx="500" cy="900" r="10" />' +
      '<text class="o-meter__text" y="960" x="100">{{ vm.format(vm.data.min, vm.data.format, vm.data.unit) }}</text>' +
      '<text class="o-meter__text" y="960" x="900">{{ vm.format(vm.data.max, vm.data.format, vm.data.unit) }}</text>' +
    '</svg>'
};
